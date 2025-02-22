
import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';
import '../data/backend-practice.js'
let cartProductsHTML = '';
let dateString='';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingItem;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingItem = product;
        }
    });

    

    cartProductsHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryOptionsHTML(matchingItem,cartItem){
  let html = '';
  let firstSelectedDate = '';
  deliveryOptions.forEach((deliveryOption)=> {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days')
    dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 
  ? 'FREE'
  : `${formatCurrency(deliveryOption.priceCents)} - `

  const isChecked = deliveryOption.id === cartItem.deliveryOptionsId

    html+= `
    <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' :''}
          class="delivery-option-input js-delivery-option"
          name="delivery-option-${matchingItem.id}"
          data-product-id="${matchingItem.id}"
          data-delivery-date="${dateString}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartProductsHTML;

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('js-delivery-option')) {
    const selectedDate = event.target.dataset.deliveryDate;
    const productId = event.target.dataset.productId;

    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    if (cartItemContainer) {
      const deliveryDateElement = cartItemContainer.querySelector('.delivery-date');
      if (deliveryDateElement) {
        deliveryDateElement.textContent = `Delivery date: ${selectedDate}`;
      }
    }
  }
});

// Delete item from cart
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        cartQuantityUpdate();
        updateCartQuant();
    });
    
});
// Function to update cart quantity safely
function cartQuantityUpdate() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Check if the cart quantity element exists before updating
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  // Store cart quantity in localStorage
  localStorage.setItem('cartQuantity', cartQuantity);
}

// Retrieve cart quantity when page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedCartQuantity = localStorage.getItem('cartQuantity');
  if (storedCartQuantity) {
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = storedCartQuantity;
    }
  }
});
function updateCartQuant(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}
updateCartQuant();
cartQuantityUpdate();
