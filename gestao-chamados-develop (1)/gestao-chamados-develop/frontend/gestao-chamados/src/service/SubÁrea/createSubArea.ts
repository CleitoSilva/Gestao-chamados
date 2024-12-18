import { ISubArea } from './../../interfaces/ISubArea';
import { Api } from "../api";

export const createSubArea = async (data:ISubArea) =>{
		const response = await Api.post("/sub-areas", data);
		return response;
};