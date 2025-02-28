
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import type { Product } from '../../types/Product';
import DeleteProductModal from './DeleteProductModal.vue';
import { deleteProduct , createProduct, updateProduct} from '../../stores/service/ProductService';
import CreateProductModal from './CreateProductModal.vue';
import EditProductModal from './EditProductModal.vue';

const products = ref<Product[]>([]);
const totalProducts = ref<number>(0);


const isLoading = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const productToDelete = ref<Product | null>(null);

const openDeleteModal = (product: Product) => {
  productToDelete.value = product;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  productToDelete.value = null;
};

const handleDelete = async () => {

  if (productToDelete.value) {
    try {
      // Perform the delete operation here
       await deleteProduct(productToDelete.value.uuid);
        // Remove the product from the list
        products.value = products?.value.filter(p => p.uuid !== productToDelete.value?.uuid);

        (window as any).$toast("Product deleted successfully", "success");
    
    } catch (error) {
      console.error(error);
    } finally {
      closeDeleteModal();
    }
  }
};

const currentPage = ref<number>(0);
const pageSize = ref<number>(7);

const handleFetchProduct = async (category: string | null = null, page: number = currentPage.value, size: number = pageSize.value) => {

  isLoading.value = true;

  try {

    let url = `${import.meta.env.VITE_API_URL}/products?page=${page}&size=${size}`;
    if (category && category !== "All") {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);

    const data = await response.json();
    products.value = data.content;
    totalProducts.value = data.totalElements;
    

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Change page (Next/Previous)
const changePage = (direction: string) => {
  if (direction === 'next') {
    currentPage.value++;
  } else if (direction === 'previous') {
    currentPage.value--;
  }
  handleFetchProduct();  // Fetch new data based on the updated page
};



const isCreateModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);

// Open Create Modal
const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

// Close Create Modal
const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

// Open Edit Modal
const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  isEditModalOpen.value = true;
};

// Close Edit Modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Handle Create Product
const handleCreateProduct = async (productData: any) => {
  try {
    // Simulate API call to create a product
    const response = await createProduct(productData);

      products.value.push(response as any); // Add the new product to the list

      closeCreateModal(); // Close the modal

      (window as any).$toast("Product created successfully", "success");


  } catch (error) {
    console.error(error);
  }
};


// Handle Edit Product
const handleEditProduct = async (productData: any) => {
  try {
    // Simulate API call to edit a product
    const response = await updateProduct(productData?.uuid, productData);

    // Find the index of the product to be edited
    const index = products.value.findIndex((p) => p.uuid === productData.uuid);

    // Replace the product with the updated product
    products.value[index] = response as any;

    (window as any).$toast("Product updated successfully", "success");

    closeEditModal(); // Close the modal

  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleFetchProduct();
});


</script>

<template>
  <div class="max-w-7xl container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <!-- Header with Create Product Button -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold leading-tight">Products</h2>
        <button @click="openCreateModal" class="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
          Create Product
        </button>
      </div>

      <!-- Table -->
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Title
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ product?.title || "Unknown" }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <img class="w-10 h-10 rounded-full object-cover" :src="product?.thumbnail || '/images/placeholder.png'"  :alt="product?.title" />
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">${{ product?.price || "undefined" }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ product?.category || "undefined"}}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button @click="openEditModal(product)" class="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out mr-2">
                    Edit
                  </button>
                  <button @click="openDeleteModal(product)" class="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

    <!-- Pagination Controls -->
   <div class="inline-flex justify-center gap-2 items-center">   
      <!-- Previous Button -->
    <a
      href="#"
      @click.prevent="changePage('previous')"
      :disabled="currentPage === 0"
      class="inline-flex items-center justify-center p-2 rounded-sm border border-gray-100 bg-white text-gray-900 hover:bg-gray-100 disabled:opacity-50"
    >
      <span class="sr-only">Previous Page</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>


    <span class="text-gray-700 px-2">{{ currentPage + 1 }}</span>

    <!-- Next Button -->
    <a
      href="#"
      @click.prevent="changePage('next')"
      :disabled="products.length < pageSize"
      class="inline-flex items-center justify-center p-2 rounded-sm border border-gray-100 bg-white text-gray-900 hover:bg-gray-100 disabled:opacity-50"
    >
      <span class="sr-only">Next Page</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>

    <p class="mr-4">Total Project: {{ totalProducts }}</p>

  </div>

      </div>

    </div>

    <!-- Create Product Modal -->
    <CreateProductModal
        :isOpen="isCreateModalOpen"
        @close="closeCreateModal"
        @submit="handleCreateProduct"
      />

    <!-- Delete Confirmation Modal -->
    <DeleteProductModal
      :isOpen="isDeleteModalOpen"
      :onConfirm="handleDelete"
      :onCancel="closeDeleteModal"
    />

    <EditProductModal
      :isOpen="isEditModalOpen"
      :product="selectedProduct as any"
      @close="closeEditModal"
      @submit="handleEditProduct"

    />

    

  </div>
</template>
