import { Api } from "../api";

export const GetAllAreas = async () =>{
	try {
		const response = await Api.get("/areas");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};