<template>
      
      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Skeleton Product Card (repeated 6 times) -->
        <div v-for="i in 8" :key="i" class="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <!-- Skeleton Image -->
          <div class="relative">
            <div class="w-full h-64 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          </div>
          
          <!-- Skeleton Product Info -->
          <div class="p-5">
            <div class="flex justify-between items-start mb-4">
              <div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            <div class="space-y-2">
              <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            <!-- Skeleton Rating -->
            <div class="flex items-center my-4">
              <div class="flex space-x-1">
                <div v-for="star in 5" :key="star" class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
              <div class="w-16 h-4 ml-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            <!-- Skeleton Button -->
            <div class="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

  </template>