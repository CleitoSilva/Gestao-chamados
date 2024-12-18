import { Api } from "../api";

export const DeleteSubArea = async (id: string) =>{
		const response = await Api.delete(`/sub-areas/${id}`);
		return response;
};