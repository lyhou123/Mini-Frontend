<script setup lang="ts">

import CategoryTableComponent from '../components/Dashboard/Category/CategoryTableComponent.vue';
import Sidebar from '../components/layout/Sidebar.vue';

</script>

<template>
   <main class="flex cotainer mx-auto">
      <Sidebar/>
    <CategoryTableComponent />
   </main>
</template>