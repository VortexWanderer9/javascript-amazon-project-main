import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js'
import {convertCentIntoPrice} from "./utils/price.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOption} from '../data/deliveryOption.js'
let cartSummary = '';
// const today = dayjs()
// const deliveryDate = today.add(7,'days');
// const formatDAte = deliveryDate.format('dddd, MMMM D')
// console.log(formatDAte);




cart.forEach((cartItem) => { 
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) =>{
      if(product.id === productId){
        matchingProduct = product;
      }
      
    })
    const deliveryId = cartItem.deliveryOptionId;
    let deliveryOptionID = '';
    deliveryOption.forEach((option) =>{
      if (option.id === deliveryId) {
        deliveryOptionID = option;
      }
    });
    const today = dayjs()
    const  deliveryDate = today.add(
      deliveryOptionID.deliveryDay, 'day'
     );
     const dateString = deliveryDate.format('dddd MMMM D');
    
  cartSummary += `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${convertCentIntoPrice(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-product" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${generateDeliveryHtml(matchingProduct,cartItem)}
    </div>
  </div>
</div>`

});


function generateDeliveryHtml(matchingProduct,cartItem){
  let html  = '';
  deliveryOption.forEach((deliveryOption) =>{
    const today = dayjs()
  const  deliveryDate = today.add(
    deliveryOption.deliveryDay, 'day'
   );
   const dateString = deliveryDate.format('dddd MMMM D');
   const priceString = deliveryOption.priceCents === 0 ? 'FREE' :`$${convertCentIntoPrice(deliveryOption.priceCents)} -`;
   const isChecked = (deliveryOption.id === cartItem.deliveryOptionId)

  

   html += `<div class="delivery-option">
  <input type="radio"
   ${isChecked ? 'checked': '' }
    class="delivery-option-input"
    name="${matchingProduct.name}">
  <div>
    <div class="delivery-option-date">
     ${(dateString)}
    </div>
    <div class="delivery-option-price">
      ${priceString} - Shipping
    </div>
  </div>
</div>`
});
return html;

  };



  
document.querySelector('.order-summary').innerHTML = cartSummary;


const deleteButton = document.querySelectorAll(".js-delete-product")

      deleteButton.forEach((span) =>{
      span.addEventListener('click', () =>{
        const productID = span.dataset.productId
        removeFromCart(productID)
        const removeFromHtml = document.querySelector(`.js-cart-container-${productID}`);
        removeFromHtml.remove()
        updateCartQuantity()
        
        
      });
      updateCartQuantity()
      });

       


function updateCartQuantity(){
  let jsHeaderQuantity = document.querySelector(".js-header-quantity")
  let cartQuantity = 0; 
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  jsHeaderQuantity.innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();
 
 


