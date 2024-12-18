import { ISubArea } from "../../interfaces/ISubArea";
import { Api } from "../api";

export const UpdateSubArea = async (data:ISubArea) =>{
	try {
		const response = await Api.patch("/sub-areas", data);
		return response;
	} catch (error) {
		return error;
	}
};