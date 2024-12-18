import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { IEvent } from "../../interfaces/Tickets/IEvent";
import { Api } from "../api";

export const GetEventsByTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<IEvent[]>, any> | undefined> => {
	try { 
		const response = await Api.get(`/tickets/events/${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};