import { USER_URL } from "../../../../../apis/endpoint.config";
import { axiosTokenInstance } from "../../../../../apis/axios.config";

export const deleteUser = async (userId: string) => {
    const response = await axiosTokenInstance.delete(`${USER_URL}/${userId}`);
    return response.data;
}