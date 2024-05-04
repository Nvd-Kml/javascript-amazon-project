import { cart, getCartQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

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
          
          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
      
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cart: cart})
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Error dude, try again later');
      }

      window.location.href = 'orders.html';
    });
}