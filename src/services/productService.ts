import axiosInstance from "@/lib/axios";

// Types
export interface Product {
  prductId: string;
  productName: string;
  productCategory: number;
  productBrand: number;
  productStyle: number;
  price: number;
  productDescription: string;
  weight: number;
  status: number;
  images: string[];
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface BrandType {
  id: number;
  name: string;
}

export interface StyleType {
  id: number;
  name: string;
}

// API functions
export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const getProductById = async (productId: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data.data.product;
};

export const getBrandTypes = async (): Promise<BrandType[]> => {
  const response = await axiosInstance.get("/products/brand/types");
  return response.data;
};

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
  const response = await axiosInstance.get("/products/category/types");
  return response.data;
};

export const getStyleTypes = async (): Promise<StyleType[]> => {
  const response = await axiosInstance.get("/products/style/types");
  return response.data;
};

export const getByProductsFilter = async (
  productCategory: number,
  productBrand: number,
  productStyle?: number
): Promise<Product[]> => {
  const params = productStyle ? `&productStyle=${productStyle}` : "";
  const response = await axiosInstance.get(
    `/products/get/filter?productCategory=${productCategory}&productBrand=${productBrand}${params}`
  );
  return response.data?.data?.products || [];
};
