import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { Api } from "../api";
import { ITicketTechnique } from "../../interfaces/Tickets/ITicketTechnique";

export const GetTechniquesByTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<ITicketTechnique[]>, any> | undefined> => {
	try { 
		const response = await Api.get(`/tickets/techniques/${idTicket}`);
		return response;
	} catch (error) {
		return undefined;
	}
};