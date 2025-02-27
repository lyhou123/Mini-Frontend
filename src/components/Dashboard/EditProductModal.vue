<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { upLoadFile } from '../../stores/service/FileService';

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(['close', 'submit']);

// Thumbnail Preview
const thumbnailPreview = ref<string | null>(null);
const thumbnail = ref<string>('');

// Validation Schema
const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  categoryName: yup.string().required('Category Name is required'),
});

// Watch product data to reset form when props change
watchEffect(() => {
  if (props.product) {
    thumbnailPreview.value = props.product.thumbnail;
    thumbnail.value = props.product.thumbnail;
  }
});

// Close Modal
const closeModal = () => {
  emit('close');
};

// Handle File Upload
const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    thumbnailPreview.value = URL.createObjectURL(file); // Show preview immediately

    try {
      const thumbnailFile = await upLoadFile(file); 
      thumbnail.value = thumbnailFile; 
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
};

// Handle Form Submission
const handleSubmit = (values: any) => {
  values.thumbnail = thumbnail.value; // Assign uploaded thumbnail to form values
  emit('submit', values);  // Submit the form with updated data
};
</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Blurred Background -->
    <div class="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-sm" @click="closeModal"></div>

    <!-- Modal Content -->
    <div class="bg-white overflow-auto h-full rounded-lg shadow-xl p-6 w-full max-w-lg z-50">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Edit Product</h3>

      <!-- Form -->
      <Form @submit="handleSubmit" :validation-schema="schema" :initialValues="props.product">
        <!-- Title -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <Field
            type="text"
            name="title"
            id="title"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <Field
            as="textarea"
            name="description"
            id="description"
            rows="3"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Price -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <Field
            type="number"
            name="price"
            id="price"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="price" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="categoryName" class="block text-sm font-medium text-gray-700">Category</label>
          <Field
            type="text"
            name="categoryName"
            id="categoryName"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="categoryName" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Thumbnail with Preview -->
        <div class="mb-4">
          <label for="thumbnail" class="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            @change="handleFileUpload"
            class="mt-1 block w-full border border-gray-300 p-2 rounded-lg cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <ErrorMessage name="thumbnail" class="text-red-500 text-sm mt-1" />

          <!-- Thumbnail Preview -->
          <div v-if="thumbnailPreview" class="mt-3">
            <img :src="thumbnailPreview" alt="Thumbnail Preview" class="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md">
          </div>
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
