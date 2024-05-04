import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from '../../data/products.js';


describe("testSuite: renderOrderSummary", () => {

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        
        let notEmptyCart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '2'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 3,
                deliveryOptionId: '1'
            }
        ];

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(notEmptyCart);
        });
        loadFromStorage();

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-return-to-home"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('3');
    });

    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2); 
    });
});