import { USER_URL } from "../../../../../apis/endpoint.config";
import { axiosInstance } from "../../../../../apis/axios.config";

export const getUserById = async (id: string) => {
    const user = await axiosInstance.get(`${USER_URL}/${id}`);
    return user.data;
}