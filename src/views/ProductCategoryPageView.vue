<script setup lang="ts">

import { useRoute } from 'vue-router';
import ProductCategoryComponent from '../components/Product/ProductCategoryComponent.vue';
import ProductHeroSection from '../components/Product/ProductHeroSection.vue';
import { onMounted, ref, watch } from 'vue';
import type { Product } from '../types/Product';


const router = useRoute();

const isLoading = ref(false)

const productList = ref<Product[]>([]);

const handleFetchProduct = async (category:string) => {
    
    isLoading.value = true;
    
    try {

        const url = `${import.meta.env.VITE_API_URL}/products/category/${category}`;

        const response = await fetch(url);

        const data = await response.json();

        productList.value = data.content;

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

watch(() => router.params.category, (newCategory) => {
  if (newCategory) {
    handleFetchProduct(newCategory as string);
  }
}, { immediate: true })

onMounted(()=>{
    
  const category = router.params.category as string;

  if (category) {
    handleFetchProduct(category);
  }
 
})

</script>



<template>

      <section class="max-w-7xl mx-auto py-10">
                
                <ProductHeroSection />
                
                <ProductCategoryComponent :Products="productList" />
              
            </section>

</template>