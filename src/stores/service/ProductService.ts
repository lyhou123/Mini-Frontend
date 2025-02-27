// src/services/productService.ts

import api from "../../api/axois";

// Define the Product type
export type Product = {
  id: number;
  uuid: string;
  title: string;
  name: string;
  price: number;
  categoryName: string;
  description: string;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductByUuid = async (Uuid: string): Promise<Product> => {
  try {

    const response = await api.get(`/products/${Uuid}`); 
    return response?.data?.data;

  } catch (error) {

    console.error(`Failed to fetch product with Uuid ${Uuid}:`, error);

    throw error;
  }
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {

    const response = await api.post('/products', product); 

    return response.data.data;

  } catch (error) {

    console.error('Failed to create product:', error);

    throw error;
  }
};

// Update an existing product
export const updateProduct = async (uuid:string, product: Partial<Product>): Promise<Product> => {

  try {

    const response = await api.put(`/products/${uuid}`, product); 
    return response?.data?.data;

  } catch (error) {

    console.error(`Failed to update product with uuid ${uuid}:`, error);
    throw error;
    
  }

};

// Delete a product
export const deleteProduct = async (uuid:string): Promise<void> => {

  try {

    await api.delete(`/products/${uuid}`); 

  } catch (error) {

    console.error(`Failed to delete product with ID ${uuid}:`, error);

    throw error;

  }
};