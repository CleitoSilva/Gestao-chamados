import { IUser } from "../../interfaces/IUser";
import { IUsuario } from "../../interfaces/IUsuario";
import { axiosTokenInstance } from "../axios.config";
import { AUTH_URL } from "../endpoint.config";

export const AuthUser = async (): Promise<IUsuario | undefined> => {
    try {
        const res = await axiosTokenInstance
            .get(`${AUTH_URL}`);

        return res.data.payload;
    } catch(error) {
        console.error("Erro na autenticação: " + error);

        return undefined;
    }
}; 