import { IUsuario } from "../../interfaces/IUsuario";
import { Api } from "../api";

export const UpdateUsuario = async (data:IUsuario) =>{
	try {
		const response = await Api.patch("/users", data);
		return response;
	} catch (error) {
		return error;
	}
};