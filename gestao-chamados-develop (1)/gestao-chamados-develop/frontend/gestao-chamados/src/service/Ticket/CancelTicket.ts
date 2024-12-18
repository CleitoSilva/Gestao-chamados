import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const CancelTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/cancel`, {
      id: idTicket
    });

		return response;
	} catch (error) {
		return undefined;
	}
};