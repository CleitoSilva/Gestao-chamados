import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { ITicket } from "../../interfaces/Tickets/ITicket";
import { Api } from "../api";

export const GetTicketById = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<ITicket>, any> | undefined> => {
	try { 
		const response = await Api.get(`/tickets/${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};