import axiosInstance from "@/lib/axios";

// Types
export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CheckoutParams {
  items: OrderItem[];
  shippingAddress?: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    eircode: string;
  };
}
export interface OrderProduct {
  productId: string;
  productName: string;
  productCategory: number;
  productBrand: number;
  productStyle: number;
  price: number;
  productDescription: string;
  weight: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientMobilePhone: string;
  recipientEircode: string;
  orderToProducts: Array<{
    orderToProductId: string;
    quantity: number;
    product: OrderProduct;
  }>;
  total: number;
  createdAt: string;
  updatedAt: string;
}
export type itemToShip = {
  productId: string;
  quantity: number;
};

export type OrderDetailsParams = {
  recipientFirstName: string;
  recipientLastName: string;
  recipientMobilePhone: string;
  recipientEircode: string;
  items: itemToShip[];
};

// API functions
export const checkout = async (data: OrderDetailsParams): Promise<Order> => {
  const response = await axiosInstance.post("/orders/checkout", data);
  return response.data;
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get("/orders");
  return response.data?.data?.orders;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};
