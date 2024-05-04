import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsAsync } from '../data/products.js';
import { loadCartAsync } from '../data/cart.js';

async function loadPage() {
    try {
        await loadProductsAsync();
        await loadCartAsync();

        renderOrderSummary();
        renderPaymentSummary();
    } catch (error) {
        console.log(`There has been some error: ${error}`);
    }
}

loadPage();

// Promise.all([
//     loadProductsFetch(),
//     loadCartFetch()
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });