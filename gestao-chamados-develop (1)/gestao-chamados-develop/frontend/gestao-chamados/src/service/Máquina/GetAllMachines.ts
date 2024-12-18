import { Api } from "../api";

export const GetAllMachines = async () =>{
	try {
		const response = await Api.get("/machines");
		return response.data.payload;
	} catch (error) {
		return error;
	}
};