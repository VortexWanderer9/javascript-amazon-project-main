import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOption.js'
import { convertCentIntoPrice } from '../utils/price.js'
import { updateHeaderCart } from '../updateHeaderCart.js'



export function paymentSummary(){
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    let priceInCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) =>{
        let found = getProduct(cartItem.productId);
        priceInCents += found.priceCents * cartItem.quantity;
       const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
       shippingPriceCents += deliveryOption.priceCents;
    });
    console.log(shippingPriceCents);
    
    const priceBeforeTax = priceInCents + shippingPriceCents;
    const taxCents = priceBeforeTax * 0.1;
    const totalCents = priceBeforeTax + taxCents;  

    const paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary 📦
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${convertCentIntoPrice(priceInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convertCentIntoPrice(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convertCentIntoPrice(priceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">💲${convertCentIntoPrice(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`
          document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}

