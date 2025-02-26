<script setup lang="ts">
import { useCartStore } from '../../stores/useCartStore';
import ButtonSolid from '../common/ButtonSolid.vue';
import CartItem from './CartIems.vue';

const cartStore = useCartStore();
</script>

<template>
  <Transition name="modal">
    <div
      v-if="cartStore.showCart"
      class="fixed inset-0 z-50 flex items-start justify-end md:items-start mt-10 mr-10"
    >
      <!-- Overlay -->
      <div
        @click="cartStore.toggleCart(false)"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        data-test="cart-background"
      />

      <!-- Cart Modal -->
      <div 
        class="relative p-4 mt-4 w-[min(32rem,calc(100%-2rem))] h-auto rounded-lg bg-white shadow-xl md:mt-0"
      >
        <!-- Header -->
        <div class="border-b border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <h2 class="font-Manrope text-xl font-bold text-gray-900">
              CART ({{ cartStore.cartLength }})
            </h2>
            <button
              @click="cartStore.toggleCart(false)"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
              data-test="cart-close-button"
            >
              Close
            </button>
          </div>
          <button
            v-if="cartStore.cartLength > 0"
            @click="cartStore.clearCart()"
            class="mt-2 text-sm text-gray-00 hover:text-gray-700 cursor-pointer"
            data-test="cart-delete-all"
          >
            Delete All
          </button>
        </div>

        <!-- Cart Items -->
        <div class="max-h-[60vh] overflow-y-auto p-4">
          <div v-if="cartStore.cartLength === 0" class="py-8 text-center text-gray-500">
            No items in cart.
          </div>
          <div 
            v-else
            class="space-y-4"
            data-test="cart-item-container"
          >
            <CartItem
              v-for="(value, index) in cartStore.cart"
              :key="index"
              :cart-item="value.product"
              :item-count="value.amount"
            />
          </div>
        </div>

        <!-- Footer -->
        <div 
          v-if="cartStore.cartLength > 0"
          class="border-t border-gray-200 p-4"
        >
          <div 
            class="mb-4 flex items-center justify-between"
            data-test="cart-total-section"
          >
            <span class="text-base font-medium text-gray-500">TOTAL</span>
            <span class="text-xl font-bold text-gray-900">${{ cartStore.cartValue }}</span>
          </div>
          <ButtonSolid
            to="/checkout"
            class="w-full"
            add="font-bold"
            color="light"
            content="CHECKOUT"
			@click="cartStore.toggleCart(false)"
            data-test="cart-checkout-button"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: translateY(-1rem);
}

.modal-leave-to .bg-white {
  transform: translateY(1rem);
}
</style>