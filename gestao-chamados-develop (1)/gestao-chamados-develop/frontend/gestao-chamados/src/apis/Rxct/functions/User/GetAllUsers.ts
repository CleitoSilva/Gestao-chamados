import { axiosInstance } from "../../../axios.config"
import { USER_BASE_URL } from "../../../endpoint.config"
import { IPaginatedUser } from "../../dto/IPaginated";

export const getUserPaginated: (skip: number, limit: number) => Promise<IPaginatedUser> = async (skip: number, limit: number) => {
    const allUsers = await axiosInstance.get(`${USER_BASE_URL}/paginated?skip=${skip}&limit=${limit}`);
    return allUsers.data;
}