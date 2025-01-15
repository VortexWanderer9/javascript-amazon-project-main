import { cart } from "../data/cart.js";

 let productHtml = '';
products.forEach(product => {
    productHtml += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container ">
            <select class="product-quantity-select-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button
         "data-product-name="${product.id}">
            Add to Cart
          </button>
        </div>`
    
});
 
 const productContainer = document.querySelector('.js-products-grid');
productContainer.innerHTML = productHtml;
    
// const addToCartButtons = 
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
       const productId = button.dataset.productName;
       const quantitySelect = document.querySelector(`.product-quantity-select-${productId}`);
       let matchingProduct = null;
       cart.forEach((item) => {
            if (item.productId === productId) {
                matchingProduct = item;
            }
       });
       let selectedQuantity = Number(quantitySelect.value);
       let cartQuantity = 0;
       if (matchingProduct) {
        cart.push({
          quantity: selectedQuantity || 1,
      });
       } else { 
            cart.push({
                productId: productId,
                quantity: selectedQuantity || 1,
            });
        }
        cart.forEach((item) =>{
            cartQuantity += item.quantity;
      })
        document.querySelector('.js-cart-quantity').textContent = cartQuantity;

        const addToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        let addedMessageTimeoutId = null;
        if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
    }
    
    // Show the message
    addToCartMessage.classList.add('added-to-cart-visible');
    
    // Set a new timeout to hide the message after 2 seconds
    addedMessageTimeoutId = setTimeout(() => {
        addToCartMessage.classList.remove('added-to-cart-visible');
    }, 2000);
});

});