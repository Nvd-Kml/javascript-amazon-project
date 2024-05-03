class Cart {
    cartItems;
    localStorageKey;

    constructor(_localStorageKey) {
        this.localStorageKey = _localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        
        if (!this.cartItems) {
            this.cartItems = [
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
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    findItemFromCart(productId) {
        return this.cartItems.find((cartItem) => cartItem.productId === productId);
    }

    addToCart(productId, selectedQuantity) {
        let itemFound = false;
      
        for (let cartItem of this.cartItems) {
          if (productId === cartItem.productId) {
            itemFound = true;
            cartItem.quantity += selectedQuantity;
            break;
          }
        }
      
        if (!itemFound) {
            this.cartItems.push({
            productId: productId,
            quantity: selectedQuantity,
            deliveryOptionId: '1'
          });
        }
    
        this.saveToStorage();
    }

    getCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
        });
    
        return cartQuantity;
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => productId !== cartItem.productId);
        this.saveToStorage();
    }

    updateQuantityFromCart(productId, quantity) {
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            cartItem.quantity = quantity;
          }
        });
        this.saveToStorage();
    }

    updateDeliveryOptionFromCart(productId, deliveryOptionId) {
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            cartItem.deliveryOptionId = deliveryOptionId;
          }
        });
    
        this.saveToStorage();
    }
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);