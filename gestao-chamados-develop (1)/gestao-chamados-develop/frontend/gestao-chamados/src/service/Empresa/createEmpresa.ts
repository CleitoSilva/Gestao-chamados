import { IEmpresa } from "../../interfaces/IEmpresa";
import { Api } from "../api";

export const createEmpresa = async (data:IEmpresa) =>{
	try {
		const response = await Api.post("/enterprises", data);
		return response;
	} catch (error) {
		return error;
	}
};