// src/services/productService.ts

import api from "../../api/axois";

// Define the Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products'); // Example endpoint
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`); // Example endpoint
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await api.post('/products', product); // Example endpoint
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, product); // Example endpoint
    return response.data;
  } catch (error) {
    console.error(`Failed to update product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`); 
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw error;
  }
};