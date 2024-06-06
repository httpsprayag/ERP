/* eslint-disable no-useless-catch */
import { axiosInstance } from './axiosInstance';

export const GET = async ({ endpoint, params }) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const POST = async ({ endpoint, data }) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PUT = async ({ endpoint, data }) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DELETE = async ({ endpoint, data }) => {
  try {
    const response = await axiosInstance.delete(endpoint, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
