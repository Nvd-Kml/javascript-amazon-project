import { addToCart, getCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(renderProductsGrid);

function renderProductsGrid() {

  let productHtml = ``;

  products.forEach((product) => {
      productHtml += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-product-quantity-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
  });

  //add all products to page
  document.querySelector('.js-products-grid').innerHTML = productHtml;

  //update cart quantity
  updateCartQuantity();

  //add to cart click event
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      
      const selectedItem = document.querySelector(`.js-product-quantity-${productId}`);
      const selectedQuantity = Number(selectedItem.value);

      addToCart(productId, selectedQuantity);
      updateCartQuantity();
      displayAddedToCart(productId);
    });
  });

  function updateCartQuantity() {
    document.querySelector('.js-cart-quantity').innerText = getCartQuantity();
  }

  function displayAddedToCart(productId) {
    const addedToCartMarker = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedToCartMarker.style.opacity = 1;

    setTimeout(() => {
      addedToCartMarker.style.opacity = 0;
    }, 2000);
  }
}
