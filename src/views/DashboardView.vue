<script setup lang="ts">
import ProductTableComponent from '../components/Dashboard/ProductTableComponent.vue';
import Sidebar from '../components/layout/Sidebar.vue';

</script>

<template>
   <main class="flex cotainer mx-auto">
      <Sidebar/>
    <ProductTableComponent />
   </main>
</template>