import { axiosInstance } from "../../../axios.config"
import { USER_BASE_URL } from "../../../endpoint.config"

export const getUserById = async (id: string) => {
    const user = await axiosInstance.get(`${USER_BASE_URL}/${id}`);
    return user.data;
}