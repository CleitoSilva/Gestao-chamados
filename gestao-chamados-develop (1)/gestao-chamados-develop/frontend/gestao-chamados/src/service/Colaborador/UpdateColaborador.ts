import { IColaborador } from "../../interfaces/IColaborador";
import { Api } from "../api";

export const UpdateColaborador = async (data:IColaborador) =>{
	try {
		const response = await Api.patch("/colaborators", data);
		return response;
	} catch (error) {
		return error;
	}
};