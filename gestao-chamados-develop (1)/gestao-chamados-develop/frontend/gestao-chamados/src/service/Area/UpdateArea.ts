import { IArea } from "../../interfaces/IArea";
import { Api } from "../api";

export const UpdateArea = async (data:IArea) =>{
	try {
		const response = await Api.patch("/areas", data);
		return response;
	} catch (error) {
		return error;
	}
};