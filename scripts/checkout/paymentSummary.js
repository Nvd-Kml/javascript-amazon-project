import { cart, getCartQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {

    let totalItemPriceCents = 0;
    let totalDeliveryPriceCents = 0;

    cart.forEach((cartItem) => {
        const curProduct = getProduct(cartItem.productId);
        totalItemPriceCents += curProduct.priceCents * cartItem.quantity;
        
        const curDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalDeliveryPriceCents += curDeliveryOption.priceCents;
    });

    let totalBeforeTaxCents = totalItemPriceCents + totalDeliveryPriceCents;
    let taxCents = Math.round(totalBeforeTaxCents) * 0.1;
    let totalWithTaxCents = (totalBeforeTaxCents + taxCents);
    
    let paymentSummaryHtml= `
          <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-row">
            <div>Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalDeliveryPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div> 
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalWithTaxCents)}</div>
          </div>
          
          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}