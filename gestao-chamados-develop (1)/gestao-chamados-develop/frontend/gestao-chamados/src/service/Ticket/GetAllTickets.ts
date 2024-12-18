import { AxiosResponse } from "axios";
import { Api } from "../api";
import { ITicket } from "../../interfaces/Tickets/ITicket";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const GetAllTickets = async (): Promise<AxiosResponse<IBaseResponse<ITicket[]>, any> | undefined> => {
	try { 
		const response = await Api.get("/tickets");
		return response;
	} catch (error) {
		return undefined;
	}
};