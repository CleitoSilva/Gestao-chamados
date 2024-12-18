import { IUsuario } from "../../interfaces/IUsuario";
import { axiosInstance } from "../axios.config";
import { AUTH_URL } from "../endpoint.config";

export const LoginUser = async (userNameOrEmail = "", password = ""): Promise<{ token: string } | undefined> => {
    try {
        const res = await axiosInstance.post(`${AUTH_URL}/login`, { userNameOrEmail: userNameOrEmail, password: password });
        password = "";

        localStorage.setItem("rxct_token", res.data.token);
    
        return res.data;
    } catch (error) {
        return undefined;
    }
};