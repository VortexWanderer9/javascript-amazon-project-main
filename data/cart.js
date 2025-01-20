// Initial cart state
export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
    },
  ];
  
  // Save the cart to localStorage
  function savetoLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add item to the cart
  export function addToCart(productId) {
    let matchingProduct = null;
    const quantitySelect = document.querySelector(`.product-quantity-select-${productId}`);
  
    // Check if the product is already in the cart
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingProduct = cartItem;
      }
    });
  
    let selectedQuantity = Number(quantitySelect.value);
  
    // If the product is already in the cart, update the quantity
    if (matchingProduct) {
      matchingProduct.quantity += selectedQuantity;
    } else {
      // Otherwise, add a new item to the cart
      cart.push({
        productId: productId,
        quantity: selectedQuantity,
      });
    }
  
    // Save the updated cart to localStorage
    savetoLocalStorage();
  }
  
  // Remove item from the cart
  export function removeFromCart(productId) {
    // Filter out the item with the given productId
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
  
    // Save the updated cart to localStorage
    savetoLocalStorage();
  }
 
 
  