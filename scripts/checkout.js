import { cart, removeFromCart, updateDeliveryOptionFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';                                      

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
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
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
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option"
            name="delivery-option-${product.id}"
            data-delivery-option="${deliveryOption.id}" 
            data-product-id="${product.id}">
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
        const curDeliveryOption = delivery.dataset.deliveryOption;
        const productId = delivery.dataset.productId;

        // update delivery option in cart
        updateDeliveryOptionFromCart(productId, curDeliveryOption);

        // update the UI to display selected delivery date
        const deliveryDateContainer = document.querySelector(`.js-delivery-date-${productId}`);
        let deliveryDate;

        switch (curDeliveryOption) {
            case '1' : deliveryDate = getDeliveryDate(7);
                     break;
            case '2' : deliveryDate = getDeliveryDate(3);
                     break;
            case '3' : deliveryDate = getDeliveryDate(1);
                     break;
            default: console.error("No such delivery option available");
        }

        deliveryDateContainer.innerText = `Delivery date: ${deliveryDate}`;

        console.log(cart);
    });
});