
<script setup lang="ts">

import ProductList from '../components/Product/ProductList.vue';


</script>

<template>
    <main>
        <section class="container mx-auto px-5 py-10">
            <h1 class="text-3xl font-bold text-center text-black">Products</h1>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductList />
            </div>
        </section>
    </main>
</template>