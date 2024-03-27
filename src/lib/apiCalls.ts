import { apiInstance } from "./apiInstance";

export const postFetch = async (url:any, body:any) => {
  try {
    const response = await apiInstance.post(url, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const getFetch = async (url:any) => {
  try {
    const response = await apiInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const putFetch = async (url:any, body:any) => {
  try {
    const response = await apiInstance.put(url, body);
    return response;
  } catch (error) {
    return error;
  }
};
export const patchFetch = async (url:any, body:any) => {
  try {
    const response = await apiInstance.patch(url, body);
    return response;
  } catch (error) {
    return error;
  }
};
