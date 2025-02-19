import { loadFromStorage } from "./cart";

function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

    if (!this.cartItems) {
        cart =[{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionsId: '1'
        },
        {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionsId: '2'
        }];
    }
    },

    saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(cart));
    },

    addToCart(productId){
        let matchingItem = null; //  Reset `matchingItem` properly
            // Find if the item is already in the cart
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingItem = cartItem;
                    this.saveToStorage();
                }
            });
              // Correctly update the cart
            if (matchingItem) {
                matchingItem.quantity += 1; // Increase quantity if item exists
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionsId: '1'
                });
            }
    },

    removeFromCart(productId){
        let newCart = [];
        this.cartItems.forEach((cartProduct) => {
          if (cartProduct.productId !== productId){
            newCart.push(cartProduct);
          }
        });
        cart = newCart;
        this.saveToStorage();
      }

    };
};

const cartGeneral=Cart('cart-oop');
const cartBusiness = Cart('cart-business');
cartGeneral.loadFromStorage()
cartBusiness.loadFromStorage();
console.log(cartBusiness)
console.log(cartGeneral)