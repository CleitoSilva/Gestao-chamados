import { ICategoriaColaborador } from "../../interfaces/ICategoriaColaborador";
import { Api } from "../api";

export const createCategoriaColaborador = async (data:ICategoriaColaborador) =>{
	try {
		const response = await Api.post("/colaborator-categories", data);
		return response;
	} catch (error) {
		return error;
	}
};