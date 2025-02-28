<template>
    <div class="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-center">
        <div>
          <img 
            class="mx-auto h-64 w-auto" 
            src="/images/404.avif" 
            alt="404 illustration" 
          />
          <h1 class="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
            Page not found
          </h1>
          <p class="mt-2 text-base text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div class="mt-8">
          <RouterLink
            to="/" 
            class="bg-black inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <HomeIcon class="mr-2 h-5 w-5" />
            Back to home
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  import { HomeIcon } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';
  </script>
