import { Api } from "../api";

export const GetAllLinhas = async () =>{
	try {
		const response = await Api.get("/lines");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};