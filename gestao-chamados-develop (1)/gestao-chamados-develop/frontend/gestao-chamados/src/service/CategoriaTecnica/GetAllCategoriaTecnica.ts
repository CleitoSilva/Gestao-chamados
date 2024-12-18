import { Api } from "../api";

export const GetAllCategoriaTecnica = async () =>{
	try {
		const response = await Api.get("/technique-category");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};