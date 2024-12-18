import { ICategoriaTecnica } from "../../interfaces/ICategoriaTecnica";
import { Api } from "../api";

export const UpdateCategoriaTecninca= async (data:ICategoriaTecnica) =>{
	try {
		const response = await Api.patch("/technique-category", data);
		return response;
	} catch (error) {
		return error;
	}
};