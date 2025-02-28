

import api from "../../api/axois";


export type ProductCategory = {
	uuid:string,
	name:string
}

export const fetchProductCategories = async (): Promise<ProductCategory[]> => {

	try {

		const response = await api.get('/categories'); 

		return response?.data?.content;

	} catch (error) {

	   console.error('Failed to fetch product categories:', error);

       throw error;

	}

}

export const fetchProductCategoryByUuid = async (uuid: string): Promise<ProductCategory> => {

	try {

		const response = await api.get(`/categories/${uuid}`); 

		return response?.data?.data;

	} catch (error) {

		console.error(`Failed to fetch product category with uuid ${uuid}:`, error);

		throw error;

	}

}

export const createProductCategory = async (category: Omit<ProductCategory, 'uuid'>): Promise<ProductCategory> => {

	try {

		const response = await api.post('/categories', category); 

		return response?.data?.data;

	} catch (error) {

		console.error('Failed to create product category:', error);

		throw error;

	}

}


export const updateProductCategory = async (uuid: string, category: Partial<ProductCategory>): Promise<ProductCategory> => {

	try {

		const response = await api.put(`/categories/${uuid}`, category); 

		return response?.data?.data;

	} catch (error) {

		console.error(`Failed to update product category with uuid ${uuid}:`, error);

		throw error;

	}

}

export const deleteProductCategory = async (uuid: string): Promise<void> => {

	try {

		const response = await api.delete(`/categories/${uuid}`); 

		return response?.data?.data;

	} catch (error) {

		console.error(`Failed to delete product category with uuid ${uuid}:`, error);

		throw error;

	}

}

