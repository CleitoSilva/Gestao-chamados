import { axiosInstance } from "../../../axios.config"
import { USER_BASE_URL } from "../../../endpoint.config"
import { ICreateUserDTO } from "../../dto/ICreateUser";

export const createUser = async (data: ICreateUserDTO) => {
    try {
        const response = await axiosInstance.post(`${USER_BASE_URL}`, data);
        return response?.data;
    } catch(error) {
        console.log("Erro ao criar o usuário");
    }
}