import { Api } from "../api";

export const GetAllTurnos = async () =>{
	try {
		const response = await Api.get("/shifts");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};