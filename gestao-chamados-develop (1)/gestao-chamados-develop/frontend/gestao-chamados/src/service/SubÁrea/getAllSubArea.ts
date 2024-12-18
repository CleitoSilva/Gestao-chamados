import { Api } from "../api";

export const GetAllSubAreas = async () =>{
	try {
		const response = await Api.get("/sub-areas");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};