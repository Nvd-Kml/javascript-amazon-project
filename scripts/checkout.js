import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';

Promise.all([
    loadProductsFetch(),
    loadCartFetch()
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});