
import axiosInstance from "@/lib/axios";

// Types
export interface UserUpdateParams {
  firstName: string;
  lastName: string;
  emailAddress: string;
  eircode: string;
  oldPassword?: string;
  password?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobilePhone: string;
  eircode: string;
}

// API functions
export const updateUser = async (data: UserUpdateParams): Promise<User> => {
  const response = await axiosInstance.put("/users/update", data);
  return response.data;
};
