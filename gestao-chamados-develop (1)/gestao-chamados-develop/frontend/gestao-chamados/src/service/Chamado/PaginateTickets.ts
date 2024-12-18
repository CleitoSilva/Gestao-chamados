import { Api } from "../api";

export const GetPaginateTicketWorkshop = async (data: string) =>{
	try {
		const response = await Api.get(`/tickets/tickets-workshop?${data}`);
		return response.data.payload;
	} catch (error) {
		return error;
	}
};