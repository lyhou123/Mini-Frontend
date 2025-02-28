<script setup lang="ts">
import {ref } from 'vue'
import { RouterLink } from 'vue-router';
import cartIcon from '/icons/cart-icon.svg'
import { useCartStore } from '../../stores/useCartStore';
import CartModal from '../Cart/CartModal.vue';
import { useAuthStore } from '../../stores/Auth/authStore';
import Router from '../../routers/router';


const hamburgerState = ref('hide')

const authStore = useAuthStore()

function showHamburger(): void {
	hamburgerState.value = 'show'
}

function hideHamburger(): void {
	hamburgerState.value = 'hide'
}

const cartStore = useCartStore()
const showDropdown = ref(false)

const logout = () => {
  authStore.logout();
  Router.push('/'); // Redirect to home page
};

</script>

<template>
	<header
		id="navi"
		class="main-container flex h-full w-screen flex-col items-center bg-black"
		data-test="nav-desktop"
	>
	<section class="relative flex w-4/5 flex-row items-center justify-between border-b border-zinc-500 py-6 md:w-11/12 lg:w-4/5">
    <button id="hamburger" class="select-none lg:hidden" @click="showHamburger()" data-test="hamburger">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-8 w-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <RouterLink
      to="/"
      class="text-3xl text-white font-extrabold tracking-tight antialiased transition duration-300 hover:scale-110 hover:text-green-600 cursor-pointer"
      data-test="nav-logo"
    >
      CAMBO
    </RouterLink>

    <nav class="hidden tracking-widest lg:flex lg:gap-8 cursor-pointer">
      <RouterLink to="/" class="uppercase text-white transition duration-300 hover:text-green-600">Home</RouterLink>
      <RouterLink to="/product" class="uppercase text-white transition duration-300 hover:text-green-600">Product</RouterLink>
      <RouterLink to="/privacy" class="uppercase text-white transition duration-300 hover:text-green-600">Privacy</RouterLink>
      <RouterLink to="/about" class="uppercase text-white transition duration-300 hover:text-green-600">About</RouterLink>
    </nav>

    <div class="flex items-center gap-6">
      <!-- Cart Icon -->
      <div class="relative h-5 cursor-pointer" @click="cartStore.toggleCart(!cartStore.showCart)" data-test="cart-button">
        <img class="h-full hover:opacity-50 active:translate-y-0.5" :src="cartIcon" alt="Cart" />
        <Transition>
          <div
            v-show="cartStore.cartLength !== 0"
            class="text-white absolute -right-2 top-3 flex h-4 w-4 flex-col items-center justify-center rounded-full bg-green-600 text-xs font-black transition-all duration-300"
            data-test="cart-bubble"
          >
            {{ cartStore.cartLength }}
          </div>
        </Transition>
      </div>

      <!-- Conditional Rendering: Login OR User Avatar -->
      <template v-if="authStore.isAuthenticated">
        <!-- User Avatar Dropdown -->
        <div class="relative">
          <button class="flex items-center gap-2 text-white focus:outline-none" @click="showDropdown = !showDropdown">
            <img src="/public/images/Profile_avatar.png" class="w-8 h-8 rounded-full cursor-pointer" alt="User Avatar" />
         
          </button>

          <!-- Dropdown Menu -->
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-40  bg-white text-black rounded-lg shadow-lg">
            <button class="block px-4 py-2 text-left hover:bg-gray-100 w-full cursor-pointer" @click="logout">Logout</button>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- Login Button -->
        <RouterLink
          to="/login"
          class="uppercase text-white transition duration-300 hover:text-green-600"
          data-test="nav-login"
        >
          Login
        </RouterLink>
      </template>
    </div>

    <CartModal v-show="cartStore.showCart" />
  </section>


		<transition>
			<nav
				class="absolute flex w-screen flex-row justify-around gap-2 bg-black p-9 text-xs font-semibold tracking-widest"
				v-if="hamburgerState === 'show'"
				:class="$route.path === '/' ? 'bg-k-black' : 'bg-black'"
				data-test="nav-mobile"
			>
				<button
					class="lg:text-md uppercase text-white transition duration-300 hover:text-k-main active:translate-y-0.5 md:text-lg"
					@click="hideHamburger()"
					data-test="close-hamburger"
				>
					Close
				</button>
				<router-link
					to="/"
					class="lg:text-md uppercase text-white transition duration-300 hover:text-k-main active:translate-y-0.5 md:text-lg"
					:class="$route.path === '/' && 'hidden'"
					@click="hideHamburger()"
					data-test="mobile-nav-home"
					>Home
				</router-link>
				<router-link
					to="/product"
					class="lg:text-md uppercase text-white transition duration-300 hover:text-k-main active:translate-y-0.5 md:text-lg"
					:class="$route.path === '/keyboards' && 'hidden'"
					@click="hideHamburger()"
					data-test="mobile-nav-keyboards"
					>Product
				</router-link>
				<router-link
					to="/privacy"
					class="lg:text-md uppercase text-white transition duration-300 hover:text-k-main active:translate-y-0.5 md:text-lg"
					:class="$route.path === '/keycaps' && 'hidden'"
					@click="hideHamburger()"
					data-test="mobile-nav-keycaps"
					>Privacy
				</router-link>
				<router-link
					to="/about"
					class="lg:text-md uppercase text-white transition duration-300 hover:text-k-main active:translate-y-0.5 md:text-lg"
					:class="$route.path === '/deskmats' && 'hidden'"
					@click="hideHamburger()"
					data-test="mobile-nav-deskmats"
					>About
				</router-link>
			</nav>
		</transition>
	</header>
</template>
