import {addToCart, cart} from'../data/cart.js';
import { loadFromStorage } from '../data/cart.js';

describe('addToCart', ()=> {
    it("add products when cart has existing products", ()=> {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1,
                deliverOptionId:'1' 
        }])
        })
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[0].quantity).toEqual(2)
    })

    it('should add a new product to the cart if it does not exist', function () {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=> {
            return JSON.stringify([]);
        })
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[0].quantity).toEqual(1)
    });
});
