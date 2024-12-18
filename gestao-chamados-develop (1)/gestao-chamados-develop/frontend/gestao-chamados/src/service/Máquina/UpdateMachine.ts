import { IMaquina } from './../../interfaces/IMaquina';
import { Api } from "../api";

export const UpdateMaquina = async (data:IMaquina) =>{
	try {
		const response = await Api.patch("/machines", data);
		return response;
	} catch (error) {
		return error;
	}
};