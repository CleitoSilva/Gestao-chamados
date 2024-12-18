import { IComponente } from "../../interfaces/IComponente";
import { Api } from "../api";

export const UpdateComponents = async (data:IComponente) =>{
	try {
		const response = await Api.patch("/components", data);
		return response;
	} catch (error) {
		return error;
	}
};