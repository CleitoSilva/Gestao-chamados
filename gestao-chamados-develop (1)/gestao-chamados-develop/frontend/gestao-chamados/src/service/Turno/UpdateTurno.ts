import { ITurno } from "../../interfaces/ITurno";
import { Api } from "../api";

export const UpdateTurno= async (data:ITurno) =>{
	try {
		const response = await Api.patch("/shifts", data);
		return response;
	} catch (error) {
		return error;
	}
};