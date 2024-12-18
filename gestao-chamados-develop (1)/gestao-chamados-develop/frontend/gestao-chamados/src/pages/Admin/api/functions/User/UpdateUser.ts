import { USER_URL } from "../../../../../apis/endpoint.config";
import { axiosTokenInstance } from "../../../../../apis/axios.config";
import { ICreateUserDTO } from "../../dto/ICreateUser";


export const updateUser = async (idUser: string, data: ICreateUserDTO) => {
	const response = await axiosTokenInstance.patch(`${USER_URL}/${idUser}`, data);
	return response.data;
};