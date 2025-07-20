import { cart, removeFromCart, updateDeliveryOptionId, updateQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { convertCentIntoPrice } from '../utils/price.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from '../../data/deliveryOption.js';
import { paymentSummary } from '../checkout/paymentSummary.js';
import { updateHeaderCart } from '../updateHeaderCart.js'


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
    cartSummary += `<div class="cart-item-container js-cart-item-container js-cart-container-${matchingProduct.id} ">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${convertCentIntoPrice(matchingProduct.priceCents)}</div>
          <div class="product-quantity js-test-quantity-${matchingProduct.id}">
            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary js-quantity-update" data-product-id="${matchingProduct.id}">Update</span>
            <input type="number" class="quantity-input js-input-quantity" value="${cartItem.quantity}" min="1" data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">save</span>
            <span class="delete-quantity-link link-primary js-delete-product js-test-delete-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Delete</span>
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
  const emptyCart = `<div class="empty-cart">
          <img src="images/empty-cart.jpg" width="350" alt="">
          <p class="empty-cart-text">Cart is empty</p>
          <p>Go and add some products</p>
         </div>`

  attachEventListeners();
  if(!cartSummary){
    orderSummaryElement.innerHTML = emptyCart
    
  }
}

function attachEventListeners() {
  document.querySelectorAll('.js-delete-product').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      const elementToRemove = document.querySelector(`.js-cart-container-${productId}`);
      if (elementToRemove) {
        renderCheckoutSummary();
      }
      paymentSummary();
      updateHeaderCart();
    });
  });
  
  document.querySelectorAll('.js-quantity-update').forEach((link) =>{
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-container-${productId}`);
      container.classList.add('is-editing-quantity')
  
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) =>{
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-container-${productId}`);
      const quantityInput = container.querySelector('.js-input-quantity');
      const newQuantity = parseInt(quantityInput.value, 10);
      updateQuantity(productId, newQuantity);
      renderCheckoutSummary();
      paymentSummary();
      updateHeaderCart();
    });
  });
  

  
  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderCheckoutSummary();
      paymentSummary();
      updateHeaderCart() 
    });
  });
}


  
// Initialize the checkout summary
renderCheckoutSummary();

// if(!orderSummaryElement){
//   console.log("i am empty");
  
// }