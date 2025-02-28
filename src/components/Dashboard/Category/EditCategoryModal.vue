<script setup lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';


// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(['close', 'submit']);


// Validation Schema
const schema = yup.object({
  name: yup.string().required('Category name is required')
});


// Close Modal
const closeModal = () => {
  emit('close');
};


// Handle Form Submission
const handleSubmit = (values: any) => {
  emit('submit', values);  
};

</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Blurred Background -->
    <div class="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-sm" @click="closeModal"></div>

    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg z-50">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Edit Category</h3>

      <!-- Form -->
      <Form @submit="handleSubmit" :validation-schema="schema" :initialValues="props.category">
        <!-- Title -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Categoy Name</label>
          <Field
            type="text"
            name="name"
            id="name"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 cursor-pointer "
          >
            Cancel
          </button>
          <button
            type="submit"
            class=" cursor-pointer bg-green-600 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Update
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
