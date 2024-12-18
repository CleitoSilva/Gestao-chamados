import { IUsuario } from "../../interfaces/IUsuario";
import { axiosTokenInstance } from "../axios.config";
import { AUTH_URL } from "../endpoint.config";

export const LoginInfo = async (): Promise<{ user: IUsuario} | undefined> => {
    try {
        const res = await axiosTokenInstance.get(`${AUTH_URL}`);
    
        return res.data;
    } catch (error) {
        return undefined;
    }
};