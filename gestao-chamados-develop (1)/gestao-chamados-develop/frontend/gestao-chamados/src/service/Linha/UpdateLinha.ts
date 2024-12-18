import { ILinha } from "../../interfaces/ILinha";
import { Api } from "../api";

export const UpdateLinha = async (data:ILinha) =>{
	try {
		const response = await Api.patch("/lines", data);
		return response;
	} catch (error) {
		return error;
	}
};