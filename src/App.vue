<script setup lang="ts">

import { onMounted, ref } from 'vue';
import Footer from './components/layout/Footer.vue'
import Navbar from './components/layout/Navbar.vue'
import Toast from './components/layout/Toast.vue'



const toastRef = ref(null);

onMounted(() => {
  (window as any).$toast = (message:string, type = "success", duration = 3000) => {
    (toastRef.value as any)?.addToast(message, type, duration);
  };
});


</script>

<template>
  <section>
    <Navbar/>

    <Toast ref="toastRef" />
    <RouterView/>
 

    <Footer/>
  </section>
  
</template>


