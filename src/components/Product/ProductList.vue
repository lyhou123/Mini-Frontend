<script setup lang="ts">
import type { Product,Categories, } from '../../types/Product';

import ProductListLoading from './ProductListLoading.vue';
import { onMounted, ref } from 'vue';
import { useCartStore } from '../../stores/useCartStore';
import { RouterLink } from 'vue-router';

const products = ref<Product[]>([]);

const isLoading = ref(true);

// const addToCart = useAddToCard();
const cardStore = useCartStore();

const categories = ref<Categories[]>([]);


const handleFetchProduct = async (category: string | null = null) => {
    isLoading.value = true;
    
    try {
        let url = `${import.meta.env.VITE_API_URL}/products`;
        
        if (category && category !== "All") {
            url += `?category=${encodeURIComponent(category)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        products.value = data.content;

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};


const hanndleFetchCategory = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);

		const data = await response.json();

		categories.value = data.content;

	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
    handleFetchProduct();
	hanndleFetchCategory();
});

</script>

<template>

     <div v-if="isLoading">
		<ProductListLoading />
	 </div>

	 
	 <div v-else >

	<!-- category name of each products -->
	<div class="my-10">
    <ul class="flex flex-wrap md:flex md:items-center  space-x-20 cursor-pointer ">

		
	   <!-- Add "See All Products" link -->
	   <li class="text-xl font-semibold text-gray-700 hover:text-green-600">
       <RouterLink :to="'/product'">
           All
      </RouterLink>
    </li>

      <li  v-for="(category, index) in categories" :key="index" class="text-xl font-semibold text-gray-700 hover:text-green-600">
        <RouterLink :to="'/product/category/' + encodeURIComponent(category?.name || 'All')">
        {{ category?.name || 'All' }}
      </RouterLink>
      </li>


    </ul>
  </div>

    
    <!-- Product list  -->
	 <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

	  <div v-for="product in products" class="group max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
	
	 <RouterLink :to="'/product/' + product.uuid ">
	  <!-- Product Image -->
	  <div class="relative overflow-hidden">
		<img 
		  class="w-full h-64 object-cover cursor-pointer object-center transition-transform duration-500 group-hover:scale-105" 
		  :src="product.thumbnail" 
		  :alt="product.title"
		/>
		<div class="absolute top-3 right-3">
		  <span  class="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
		</div>
	  </div>
		</RouterLink>
	  
	  <!-- Product Info -->
	  <div class="p-5">
		<div class="flex justify-between items-start mb-2">
		  <h3 class="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">{{ product.title }}</h3>
		  <div class="flex items-center">
			<span class="text-2xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
		  </div>
		</div>
		
		<p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ product.description }}</p>
		
		<!-- Rating -->
		<div class="flex items-center mb-4">
		  <div class="flex text-amber-400">
			<svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"  class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		  </div>
		</div>
		
		<!-- Add to Cart Button -->
		<button 
		  @click="cardStore.addToCart(product)"
		  class="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
		>
		  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
		  </svg>
		  Add to Cart
		</button>
	  </div>
	</div>
			
</div>
 </div>
  </template>



