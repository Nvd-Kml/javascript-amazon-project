import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsAsync } from '../data/products.js';
import { loadCartAsync } from '../data/cart.js';

async function loadPage() {
    await loadProductsAsync();
    await loadCartAsync();

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

// Promise.all([
//     loadProductsFetch(),
//     loadCartFetch()
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });