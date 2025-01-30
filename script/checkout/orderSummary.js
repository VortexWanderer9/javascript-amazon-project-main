import { cart, removeFromCart, updateDeliveryOptionId } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { convertCentIntoPrice } from '../utils/price.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from '../../data/deliveryOption.js';
import { paymentSummary } from '../checkout/paymentSummary.js';

function generateDeliveryHtml(matchingProduct, cartItem) {
  const today = dayjs();
  let html = '';

  deliveryOption.forEach((option) => {
    const deliveryDate = today.add(option.deliveryDay, 'day');
    const dateString = deliveryDate.format('dddd MMMM D');
    const priceString = option.priceCents === 0 ? 'FREE' : `$${convertCentIntoPrice(option.priceCents)}`;
    const isChecked = option.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
      <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="${matchingProduct.name}">
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} - Shipping</div>
      </div>
    </div>`;
  });

  return html;
}

  export function renderCheckoutSummary() {
  const today = dayjs();
  const productMap = new Map(products.map((p) => [p.id, p]));
  const deliveryOptionMap = new Map(deliveryOption.map((d) => [d.id, d]));
  let cartSummary = '';

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    if (!matchingProduct) {
      console.error('Product not found for ID:', cartItem.productId);
      return;
    }

    const deliveryOptionID = deliveryOptionMap.get(cartItem.deliveryOptionId);
    if (!deliveryOptionID) {
      console.error('Delivery option not found for ID:', cartItem.deliveryOptionId);
      return;
    }

    const deliveryDate = today.add(deliveryOptionID.deliveryDay, 'day');
    const dateString = deliveryDate.format('dddd MMMM D');

    cartSummary += `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${convertCentIntoPrice(matchingProduct.priceCents)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-product" data-product-id="${matchingProduct.id}">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${generateDeliveryHtml(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
  });

  const orderSummaryElement = document.querySelector('.order-summary');
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartSummary;
  }

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.js-delete-product').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      const elementToRemove = document.querySelector(`.js-cart-container-${productId}`);
      if (elementToRemove) {
        elementToRemove.remove();
      }
      updateCartQuantity();
      paymentSummary();
    });
  });
  updateCartQuantity();
  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderCheckoutSummary();
      paymentSummary();
    });
  });
}

function updateCartQuantity() {
  const jsHeaderQuantity = document.querySelector('.js-header-quantity');
  if (!jsHeaderQuantity) return;

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  jsHeaderQuantity.textContent = `${cartQuantity} items`;
}

// Initialize the checkout summary
renderCheckoutSummary();
