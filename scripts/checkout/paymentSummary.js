import { cart, getCartQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency, getTaxRate } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {

    let totalItemPrice = 0;
    let totalDeliveryPrice = 0;

    cart.forEach((cartItem) => {
        const curProduct = getProduct(cartItem);

        totalItemPrice += curProduct.priceCents * cartItem.quantity;
        
        const curDeliveryOption = deliveryOptions.find(
            (option) => cartItem.deliveryOptionId == option.id
        );

        totalDeliveryPrice += curDeliveryOption.priceCents;
    });

    let totalPriceWithoutTax = formatCurrency(totalItemPrice + totalDeliveryPrice);
    let taxAmount = getTaxRate(totalPriceWithoutTax);
    let totalPriceWithTax = (totalPriceWithoutTax + taxAmount).toFixed(2);

    let paymentSummaryHtml= `
          <div class="payment-summary-row">
            <div>Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalDeliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalPriceWithoutTax}</div> 
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxAmount}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalPriceWithTax}</div>
          </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}