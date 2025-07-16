import { renderCheckoutSummary } from '../../script/checkout/orderSummary.js'
import { loadFromLocalStorage, cart } from '../../data/cart.js'


describe('test suit: renderCheckoutSummary', () =>{
  beforeEach(() =>{
    spyOn(localStorage, 'setItem')
      const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
      document.querySelector('.js-test-container').innerHTML = 
        `<div class= "order-summary"> </div>
        <div class= "js-payment-summary"> </div>
        <div class= "js-header-quantity"> </div>
        `

        spyOn(localStorage, 'getItem').and.callFake(() =>{
        return JSON.stringify([{
                productId: product1,
                quantity: 2,
                deliveryOptionId : '1',
              },{
                productId: product2,
                quantity: 1,
                deliveryOptionId : '2'
              },]);
      });
       loadFromLocalStorage();
       renderCheckoutSummary()
  })
    it ('display the cart', () =>{
        const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
       expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)
       expect(document.querySelector(`.js-test-quantity-${product1}`).innerText).toContain('Quantity: 2')
       expect(document.querySelector(`.js-test-quantity-${product2}`).innerText).toContain('Quantity: 1')

       document.querySelector('.js-test-container').innerHTML =''
    });
    it('check delete button work ', () =>{
        const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
       document.querySelector(`.js-test-delete-${product1}`).click()
       expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1)
       expect(document.querySelector(`.js-cart-container-${product1}`)).toEqual(null)
       expect(document.querySelector(`.js-cart-container-${product2}`)).not.toEqual(null)
       expect(cart.length).toEqual(1)
       expect(cart[0].productId).toEqual(product2)
       document.querySelector('.js-test-container').innerHTML =''
    })
})