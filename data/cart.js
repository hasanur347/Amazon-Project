export const cart = [];
export function addToCart(productId){
    let matchingItem = null; //  Reset `matchingItem` properly
          // Find if the item is already in the cart
          cart.forEach((cartItem) => {
              if (item.productId === productId) {
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