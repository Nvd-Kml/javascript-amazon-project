export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3
  }
];

export const addProductToCart = (productId) => {
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
        quantity: 1
      });
    }
  }
