import { addToCart, loadFromStorage, findItemFromCart } from "../../data/cart.js";

describe('testSuite: addToCart', () => {

    let productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('when product is in the cart', () => {

        let notEmptyCart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '2' 
            }
        ];

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(notEmptyCart);
        });
        loadFromStorage();

        addToCart(productId, 2);
        let item = findItemFromCart(productId);

        expect(item.quantity).toEqual(4); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);   
    });

    it('when product is not in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        addToCart(productId, 2);
        let item = findItemFromCart(productId);

        expect(item.quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    });
});