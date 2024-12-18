import { IMaquina } from "../../interfaces/IMaquina";
import { Api } from "../api";

export const createMaquina = async (data:IMaquina) =>{
		const response = await Api.post("/machines", data);
		return response;
};