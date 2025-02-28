<script setup lang="ts">

import { onMounted, ref } from 'vue';
import type { Categories } from '../../../types/Product';
import { createProductCategory, deleteProductCategory, fetchProductCategories, updateProductCategory } from '../../../stores/service/ProductCategory';
import EditCategoryModal from './EditCategoryModal.vue';
import DeleteCategoryModal from './DeleteCategoryModal.vue';
import CreateCategoryModal from './CreateCategoryModal.vue';



const productsCategory = ref<Categories[]>([]);


const isLoading = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const categoryDelete = ref<Categories | null>(null);

const openDeleteModal = (category: Categories) => {
  categoryDelete.value = category;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  categoryDelete.value = null;
};

const handleDelete = async () => {

  if (categoryDelete.value) {
    try {
      // Perform the delete operation here
       await deleteProductCategory(categoryDelete.value.uuid);
        // Remove the product from the list
        productsCategory.value = productsCategory?.value.filter(p => p.uuid !== categoryDelete.value?.uuid);

        (window as any).$toast('Product Category deleted successfully', 'success');
    
    } catch (error) {
      console.error(error);
    } finally {
      closeDeleteModal();
    }
  }
};

const handleFetchProductCategory = async () => {

  isLoading.value = true;

  try {

    const response = await fetchProductCategories();
   
    productsCategory.value = response as any;

  } catch (error) {

    console.error(error);

  } finally {

    isLoading.value = false;

  }
};


const isCreateModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const selectedCategory = ref<Categories | null>(null);

// Open Create Modal
const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

// Close Create Modal
const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

// Open Edit Modal
const openEditModal = (category: Categories) => {
  selectedCategory.value = category;
  isEditModalOpen.value = true;
};

// Close Edit Modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
};
const handleCreateProductCategory = async (productData: Categories) => {
  try {
    // Simulate API call to create a product category
    const response = await createProductCategory(productData);

    if (response) {
      // Add the created category to the list
      productsCategory.value.push(response as any);

      // Show success toast
      (window as any).$toast('Product Category created successfully', 'success');

      // Close the modal
      closeCreateModal();
    } else {
      
      (window as any).$toast('Failed to create product category', 'error');
      closeCreateModal();

    }
  } catch (error) {
    // Log and show error toast
    console.error(error);
    (window as any).$toast('Failed to create product category', 'error');
    closeCreateModal();
  }
};


// Handle Edit Product category
const handleEditProductCategory = async (productData: any) => {
  try {
   
    const response = await updateProductCategory(productData?.uuid, productData);

    const index = productsCategory.value.findIndex((p) => p.uuid === productData.uuid);

    productsCategory.value[index] = response as any;

    (window as any).$toast('Product Category updated successfully', 'success');

    closeEditModal(); 

  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleFetchProductCategory();
});


</script>

<template>
    <div class="max-w-7xl container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <!-- Header with Create Product Button -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold leading-tight">Products Category</h2>
          <button @click="openCreateModal" class="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
            Create Category
          </button>
        </div>
  
        <!-- Table -->
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created By
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="categories in productsCategory" :key="categories.uuid">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ categories?.name || "Unknown" }}</p>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ categories?.createdBy || "undefined" }}</p>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap"> {{ categories?.createdAt ? new Date(categories.createdAt).toLocaleString() : "undefined" }}</p>
                  </td>
              
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button @click="openEditModal(categories)" class="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out mr-2">
                      Edit
                    </button>
                    <button @click="openDeleteModal(categories)" class="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Create Product Modal -->
      <CreateCategoryModal
          :isOpen="isCreateModalOpen"
          @close="closeCreateModal"
          @submit="handleCreateProductCategory"
        />
  
      <!-- Delete Confirmation Modal -->
      <DeleteCategoryModal
        :isOpen="isDeleteModalOpen"
        :onConfirm="handleDelete"
        :onCancel="closeDeleteModal"
      />
  
      <EditCategoryModal
        :isOpen="isEditModalOpen"
        :category="selectedCategory as any"
        @close="closeEditModal"
        @submit="handleEditProductCategory"
  
      />
  
    </div>
  </template>
  
