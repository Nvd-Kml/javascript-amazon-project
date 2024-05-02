import { cart, removeFromCart, updateDeliveryOptionFromCart, updateQuantityFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';                                      

function renderOrderSummary() {

    let cartSummaryHtml = ``;

    cart.forEach((cartItem) => {

        const product = getProduct(cartItem);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOptionDays = deliveryOptions
                        .find((option) => deliveryOptionId === option.id)
                        .deliveryDays;
        const deliveryOptionDate = getDeliveryDate(deliveryOptionDays);

        cartSummaryHtml += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date js-delivery-date-${product.id}">
                Delivery date: ${deliveryOptionDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${product.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(product.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-${product.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${product.id}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id="${product.id}">
                            Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${generateDeliveryOptionsHTML(product, cartItem)}
                </div>
            </div>
        </div>`
    });

    function generateDeliveryOptionsHTML(product, cartItem) {

        let deliveryOptionsHtml = ``;
        
        deliveryOptions.forEach((deliveryOption) => {{

            let dateString = getDeliveryDate(deliveryOption.deliveryDays);
            let priceString = deliveryOption.priceCents === 0 
                            ? "FREE Shipping" 
                            : `$${(deliveryOption.priceCents / 100).toFixed(2)}`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            deliveryOptionsHtml += `
            <div class="delivery-option js-delivery-option" 
                data-delivery-option-id="${deliveryOption.id}" 
                data-product-id="${product.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString}
                    </div>
                </div>
            </div>`
        }});
        
        return deliveryOptionsHtml;
    }

    function getDeliveryDate(days) {
        let today = dayjs();
        return today.add(days, 'day').format('dddd, MMMM D');
    } 

    function getProduct(cartItem) {
        for (let product of products) {
            if (product.id === cartItem.productId) {
                return product;
            }
        }
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            removeFromCart(productId);
            document.querySelector(
                `.js-cart-item-container-${productId}`
            ).remove();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((delivery) => {
        delivery.addEventListener('click', () => {
            const {productId, deliveryOptionId} = delivery.dataset;

            // update delivery option in cart
            updateDeliveryOptionFromCart(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });
}

renderOrderSummary();