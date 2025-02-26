import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Product } from '../types/Product';

type CartItem = {
  product: Product;
  amount: number;
};

type Cart = Record<string, CartItem>;

export const useCartStore = defineStore('cart', {

  state: () => ({
    cart: useStorage<Cart>('cart', {}),
    showCart: false,
    showQuickAdd: true,
    shipping: 50,
    freeShippingThreshold: 1000,
  }),

  actions: {
    toggleCart(state: boolean) {
      this.showCart = state;
      document.body.classList.toggle('overflow-y-hidden', state);
    },

    addToCart(item: Product) {

      const itemKey = `${item.category}-${item.id}`;
	  
      if (this.cart[itemKey]) {
        this.cart[itemKey].amount++;
      } else {
        this.cart[itemKey] = { product: item, amount: 1 };
      }
    },

    removeFromCart(item: Product) {
      const itemKey = `${item.category}-${item.id}`;
      if (this.cart[itemKey]) {
        this.cart[itemKey].amount > 1 ? this.cart[itemKey].amount-- : delete this.cart[itemKey];
      }
    },

    clearCart() {
      this.cart = {};
    },

    getProductAmount(productKey: string): number {
      return this.cart[productKey]?.amount || 0;
    },
  },

  getters: {
    cartValue: (state) => 
      Object.values(state.cart).reduce((total, item) => total + item.amount * Number(item.product.price), 0),

     cartLength: (state) =>
     Object.values(state.cart).reduce((count, item) => count + item.amount, 0),

    isEmpty: (state) => Object.keys(state.cart).length === 0,


    getItemAmountByKey: (state) => (productKey: string) => state.cart[productKey]?.amount || 0,

    getItemByKey: (state) => (productKey: string) => state.cart[productKey] || null,

    getFirstItem: (state) => state.cart[Object.keys(state.cart)[0]] || null,

    getUniqueItems: (state) => Object.keys(state.cart).length,

    isCartShown: (state) => state.showCart,
  },
});
