<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Product } from '../types/Product';
import { useRoute } from 'vue-router';
import ProductDetailsComponent from '../components/Product/ProductDetailsComponent.vue';
import ProductFeature from '../components/Product/ProductFeature.vue';
import ProductCategoryBox from '../components/Product/ProductCategoryBox.vue';


const product = ref<Product | null>(null);
const productCategory = ref<Product[]>([]);
const category = ref<string>("");

const errorMessage = ref<string | null>(null);
const route = useRoute();

const handleFetchProductDetails = async (uuid: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${uuid}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }

        const data = await response.json();

        product.value = data?.data;

        category.value = data?.data?.category;

        errorMessage.value = null; 

    } catch (error) {
        
        errorMessage.value = "Failed to load product details. Please try again later.";
    }
};


const handleFetchProductCategory = async (category:string) => {

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/products/category/${category}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch products. Status: ${response.status}`);
		}

		const data = await response.json();

		productCategory.value = data?.content;

	} catch (error) {
		console.error(error);
	}
};


onMounted(() => {
    const uuid = route.params.uuid as string;
    if (uuid) {
        handleFetchProductDetails(uuid);
    } else {
        errorMessage.value = "Invalid product UUID.";
    }
});

// Watch for changes in product and fetch category when product is updated
watch(product, (newProduct) => {
    if (newProduct && newProduct.category) {
        handleFetchProductCategory(newProduct.category);
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
            <ProductCategoryBox :products="productCategory"/>

        </div>

        <div v-else class="text-center text-gray-500">
            Loading product details...
        </div>
    </section>
</main>
</template>
