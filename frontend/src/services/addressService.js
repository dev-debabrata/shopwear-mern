import { axiosInstance } from "../utils/axios";

export const getMyAddresses = async () => {
    const { data } = await axiosInstance.get("/addresses/my-addresses");
    return data;
};

export const createAddress = async (addressData) => {
    const { data } = await axiosInstance.post("/addresses", addressData);
    return data;
};

export const updateAddress = async (id, addressData) => {
    const { data } = await axiosInstance.put(`/addresses/${id}`, addressData);
    return data;
};

export const deleteAddress = async (id) => {
    const { data } = await axiosInstance.delete(`/addresses/${id}`);
    return data;
};