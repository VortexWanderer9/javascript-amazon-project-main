import { addToCart, cart, loadFromLocalStorage } from '../../data/cart.js'

describe('test suits: addToCart', () => {
  it('adding existing product cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() =>{
        return JSON.stringify([ {
          productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
          quantity: 1,
         deliveryOptionId : '1',
        }
        ]);
      });
      spyOn(localStorage, 'setItem');
      loadFromLocalStorage();

      addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    expect(cart[0].quantity).toEqual(2)
  });
  it('adding a new product to cart', () => {
      const productId = '54e0eccd-8f36-462b-b68a-8182611d9add';
      // Create a fake element with a 'value' property
      const fakeSelect = {
        value: '1'
    };

    // spy on localStorage setItem set function
    spyOn(localStorage, 'setItem');

    // Spy on document.querySelector and make it return fakeSelect
      spyOn(document, 'querySelector').and.callFake((selector) => {
        if (selector === `.product-quantity-select-${productId}`) {
          return fakeSelect;
        }
        return null; // fallback if any other selector called
      });
    spyOn(localStorage, 'getItem').and.callFake(() =>{
        return JSON.stringify([])
    })
    console.log(localStorage.getItem('cart'));
    loadFromLocalStorage() // Load the initial cart state
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    expect(cart[0].quantity).toEqual(1)

  });
});

