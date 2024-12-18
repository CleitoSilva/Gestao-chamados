import { ISubArea } from "../../interfaces/ISubArea";
import { Api } from "../api";

export const GetPaginateSubArea = async (data: string) =>{
	try {
		const response = await Api.get(`/sub-areas/paginate?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};