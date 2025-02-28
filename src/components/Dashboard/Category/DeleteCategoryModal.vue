<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p class="mb-6">Are you sure you want to delete this product category?</p>
        <div class="flex justify-end space-x-4">
          <button @click="onCancel" class="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
            Cancel
          </button>
          <button @click="onConfirm" class="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    onConfirm: {
      type: Function as any,
      required: true,
    },
    onCancel: {
      type: Function as any,
      required: true,
    },
  });
  </script>