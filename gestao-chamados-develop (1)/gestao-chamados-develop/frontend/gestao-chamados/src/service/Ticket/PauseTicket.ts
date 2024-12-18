import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const PauseTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/pause`, {
      id: idTicket
    });

		return response;
	} catch (error) {
		return undefined;
	}
};