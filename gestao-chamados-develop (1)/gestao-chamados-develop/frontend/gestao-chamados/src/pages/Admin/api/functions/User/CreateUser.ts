import { USER_URL } from "../../../../../apis/endpoint.config";
import { axiosInstance } from "../../../../../apis/axios.config";
import { ICreateUserDTO } from "../../dto/ICreateUser";

export const createUser = async (data: ICreateUserDTO) => {
    const response = await axiosInstance.post(`${USER_URL}`, data);
    return response.data;
}