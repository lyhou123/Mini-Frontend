<template>
    <TransitionGroup name="toast" tag="div" class="fixed top-5 right-5 z-50 space-y-2">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        role="alert"
        class="rounded-xl border border-gray-100 bg-white p-4"
        :class="toastClasses(toast.type)"
      >
        <div class="flex items-start gap-4">
          <span :class="toastIconClasses(toast.type)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
  
          <div class="flex-1">
            <strong class="block font-medium text-gray-900">{{ toast.type }}</strong>
            <p class="mt-1 text-sm text-gray-700">{{ toast.message }}</p>
          </div>
  
          <button
            @click="dismissToast(index)"
            class="text-gray-500 transition hover:text-gray-600"
          >
            <span class="sr-only">Dismiss popup</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const toasts = ref([]);
  
  const addToast = (message, type, duration = 3000) => {
    const toast = { message, type };
    toasts.value.push(toast);
  
    setTimeout(() => {
      toasts.value.shift();
    }, duration);
  };
  
  const dismissToast = (index) => {
    toasts.value.splice(index, 1);
  };
  
  const toastClasses = (type) => {
    const classes = {
      success: "bg-green-600",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };
    return classes[type] || "bg-gray-800";
  };
  
  const toastIconClasses = (type) => {
    const iconClasses = {
      success: "text-green-600",
      error: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
    };
    return iconClasses[type] || "text-gray-800";
  };
  
  defineExpose({ addToast });
  </script>
  