import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOption.js'
import { convertCentIntoPrice } from '../utils/price.js'


export function paymentSummary(){
    let priceInCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) =>{
        let found = getProduct(cartItem.productId);
        priceInCents += found.priceCents * cartItem.quantity;
       const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
       shippingPriceCents += deliveryOption.priceCents;
    });
    const priceBeforeTax = priceInCents + shippingPriceCents;
    const taxCents = priceBeforeTax * 0.1;
    const totalCents = priceBeforeTax + taxCents;  

    const paymentSummary = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${convertCentIntoPrice(priceInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convertCentIntoPrice()}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`
}