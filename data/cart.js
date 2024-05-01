export const cart = [];

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
