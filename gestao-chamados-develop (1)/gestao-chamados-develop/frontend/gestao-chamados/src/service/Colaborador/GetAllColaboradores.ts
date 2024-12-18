import { Api } from "../api";

export const GetAllColaboradores = async () =>{
	try {
		const response = await Api.get("/colaborators");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};