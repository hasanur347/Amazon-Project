export const cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];
export function addToCart(productId){
    let matchingItem = null; //  Reset `matchingItem` properly
          // Find if the item is already in the cart
          cart.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                  matchingItem = cartItem;
              }
          });
  
          // Correctly update the cart
          if (matchingItem) {
              matchingItem.quantity += 1; // Increase quantity if item exists
          } else {
              cart.push({
                  productId: productId,
                  quantity: 1
              });
          }
  }