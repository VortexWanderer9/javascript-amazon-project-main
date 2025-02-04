import { renderCheckoutSummary } from './checkout/orderSummary.js'
import { paymentSummary } from './checkout/paymentSummary.js'
import { updateHeaderCart } from './updateHeaderCart.js'
paymentSummary();
renderCheckoutSummary();
updateHeaderCart();