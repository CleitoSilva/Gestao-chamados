import { AxiosResponse } from "axios";
import { Api } from "../api";
import { IBaseResponse } from "../../interfaces/IBaseResponse";

export const ReinitializeTicket = async (idTicket: number): Promise<AxiosResponse<IBaseResponse<null>, any> | undefined> => {
	try { 
		const response = await Api.patch(`/tickets/reinitialize`, {
      id: idTicket
    });

		return response;
	} catch (error) {
		return undefined;
	}
};