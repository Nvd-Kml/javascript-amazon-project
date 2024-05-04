export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

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
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function findItemFromCart(productId) {
  return cart.find((cartItem) => cartItem.productId === productId);
}

export function addToCart(productId, selectedQuantity) {
  let itemFound = false;

  for (let cartItem of cart) {
    if (productId === cartItem.productId) {
      itemFound = true;
      cartItem.quantity += selectedQuantity;
      break;
    }
  }

  if (!itemFound) {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
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

export function loadCartFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/cart'
  ).then((response) => {
    return response.text();
  }).then((cartData) => {
    console.log(cartData);
  })

  return promise;
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}
