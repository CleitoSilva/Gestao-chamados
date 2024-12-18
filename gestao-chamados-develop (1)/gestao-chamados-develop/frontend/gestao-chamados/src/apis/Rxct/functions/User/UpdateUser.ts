import { ICreateUserDTO } from "../../dto/ICreateUser";
import { axiosInstance } from "../../../axios.config";
import { USER_BASE_URL } from "../../../endpoint.config";

export const updateUser = async (idUser: string, data: ICreateUserDTO) => {
    try {
        const response = await axiosInstance.patch(`${USER_BASE_URL}/${idUser}`, data)
        return response?.data;
    } catch(error) {
        console.log("Erro no momento de atualizar o usuário!")
    }
}