<script setup lang="ts">
import Footer from './components/layout/Footer.vue'
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
  <section>
    <Navbar/>
  
    <RouterView/>
 

    <Footer/>
  </section>
  
</template>


