import { USER_URL } from "../../../../../apis/endpoint.config";
import { axiosInstance } from "../../../../../apis/axios.config";
import { IPaginatedUser } from "../../../dtos/Ipaginated";

export const getUserPaginated: (skip: number, limit: number) => Promise<IPaginatedUser> = async (skip: number, limit: number) => {
    const allUsers = await axiosInstance.get(`${USER_URL}/paginated?skip=${skip}&limit=${limit}`);
    return allUsers.data;
}