    import { cart } from "../data/cart.js";
    
    export function updateHeaderCart() {
        const cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const headerQuantity = `(<a class="return-to-home-link js-header-quantity"
            href="amazon.html">Items-${cartQuantity}</a>)`
        document.querySelector('.js-header-quantity').innerHTML = headerQuantity;
    }


       
    
        
    
        