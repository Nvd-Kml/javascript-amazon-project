export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
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

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let itemFound = false;
  
    for (let cartItem of cart) {
      if (productId === cartItem.productId) {
        itemFound = true;
        cartItem.quantity++;
        break;
      }
    }
  
    if (!itemFound) {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
  }

  export function getCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => productId !== cartItem.productId);
    saveToStorage();
  }

  export function updateQuantityFromCart(productId, quantity) {
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = quantity;
      }
    });
    saveToStorage();
  }

  export function updateDeliveryOptionFromCart(productId, deliveryOptionId) {
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });

    saveToStorage();
  }
