import { cart } from "../data/cart.js";
import { getProduct, products } from "../data/products.js"
import { convertCentIntoPrice } from '../script/utils/price.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption, getDeliveryOption } from '../data/deliveryOption.js';
import { paymentSummary } from '../script/checkout/paymentSummary.js';

document.querySelector('.cart-quantity').innerHTML = cart.length

    
const orderTrackingId = crypto.randomUUID();
console.log(orderTrackingId);

function renderOrderHtml() {
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

        cart.forEach((cartItem) =>{
        let found = getProduct(cartItem.productId);
        priceInCents += found.priceCents * cartItem.quantity;
       const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
       shippingPriceCents += deliveryOption.priceCents;
    });
  
    const priceBeforeTax = priceInCents + shippingPriceCents;
    const taxCents = priceBeforeTax * 0.1;
    const totalCents = priceBeforeTax + taxCents; 
    
        const deliveryDate = today.add(deliveryOptionID.deliveryDay, 'day');
        const dateString = deliveryDate.format('dddd MMMM D');
        let cartSummary = `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${convertCentIntoPrice(totalCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${cart.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            <div class="product-image-container">
              <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Adults Plain Cotton T-Shirt - 2 Pack
              </div>
              <div class="product-delivery-date">
                Arriving on: August 19
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>`

document.querySelector('.orders-grid').innerHTML = cartSummary
})}
renderOrderHtml()


// let orderContainer = ` 
//         <div class="order-container">

//           <div class="order-header">
//             <div class="order-header-left-section">
//               <div class="order-date">
//                 <div class="order-header-label">Order Placed:</div>
//                 <div>June 10</div>
//               </div>
//               <div class="order-total">
//                 <div class="order-header-label">Total:</div>
//                 <div>$41.90</div>
//               </div>
//             </div>

//             <div class="order-header-right-section">
//               <div class="order-header-label">Order ID:</div>
//               <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
//             </div>
//           </div>

//           <div class="order-details-grid">
//             <div class="product-image-container">
//               <img src="images/products/intermediate-composite-basketball.jpg">
//             </div>

//             <div class="product-details">
//               <div class="product-name">
//                 Intermediate Size Basketball
//               </div>
//               <div class="product-delivery-date">
//                 Arriving on: June 17
//               </div>
//               <div class="product-quantity">
//                 Quantity: 2
//               </div>
//               <button class="buy-again-button button-primary">
//                 <img class="buy-again-icon" src="images/icons/buy-again.png">
//                 <span class="buy-again-message">Buy it again</span>
//               </button>
//             </div>

//             <div class="product-actions">
//               <a href="tracking.html">
//                 <button class="track-package-button button-secondary">
//                   Track package
//                 </button>
//               </a>
//             </div>
//           </div>
//         </div>`

//         