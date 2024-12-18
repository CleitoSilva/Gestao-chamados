import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { Api } from "../api";

export const FinishTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/finish`, {
      id: idTicket
    });

		return response;
	} catch (error) {
		return undefined;
	}
};