<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Product } from '../types/Product';
import { useRoute } from 'vue-router';
import ProductDetailsComponent from '../components/Product/ProductDetailsComponent.vue';
import ProductFeature from '../components/Product/ProductFeature.vue';
import ProductCategoryBox from '../components/Product/ProductCategoryBox.vue';


const product = ref<Product | null>(null);
const errorMessage = ref<string | null>(null);
const route = useRoute();

const handleFetchProductDetails = async (id: number) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }

        const data = await response.json();

        product.value = data;

        errorMessage.value = null; 

    } catch (error) {
        console.error(error);
        errorMessage.value = "Failed to load product details. Please try again later.";
    }
};

onMounted(() => {

    const id = Number(route.params.id);

    if (!isNaN(id) && id > 0) {
        handleFetchProductDetails(id);
    } else {
        errorMessage.value = "Invalid product ID.";
    }
});
</script>

<template>
<main class="flex h-full w-screen flex-col items-center bg-white">
    <section class="max-w-6xl">
        <div v-if="errorMessage" class="text-red-500 text-center">
            {{ errorMessage }}
        </div>

        <div v-else-if="product">
             <!-- pass product item to component show data -->
            <ProductDetailsComponent :item="product"/>
            
            <!-- product feature need dybamic description -->
            <ProductFeature :features="product.description" :inthebox="[
                { count: 1, content: 'Product' },
                { count: 1, content: 'Manual' },
                { count: 1, content: 'Warranty' }
            ]"/>

            <!-- product category box dynamic data flow product category-->
            <ProductCategoryBox :productCategory="product.title"/>

        </div>

        <div v-else class="text-center text-gray-500">
            Loading product details...
        </div>
    </section>
</main>
</template>
