import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }

  extraInfoHtml() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing')
          return new Clothing(productDetails);
      
      return new Product(productDetails)
    });
    console.log('loaded products');
  }).catch((error) => {
    console.log(`There has been some error: ${error}`);
  })

  return promise;
}

export async function loadProductsAsync() {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    const productsData = await response.json();

    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing')
          return new Clothing(productDetails);
      
      return new Product(productDetails)
    });
  } catch (error) {
    console.log(`There has been some error: ${error}`);
  }
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === 'clothing')
          return new Clothing(productDetails);
      
      return new Product(productDetails)
    });
    console.log('loaded products');
    fun();
  });

  xhr.addEventListener('error', (error) => {
    console.log(`There has been some error: ${error}`);
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products')
  xhr.send();
}

export function getProduct(productId) {
  return products.find(
    (product) => productId == product.id
  );
}
