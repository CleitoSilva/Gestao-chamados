import { AxiosResponse } from "axios";
import { IBaseResponse } from "../../interfaces/IBaseResponse";
import { IColaborador } from "../../interfaces/IColaborador";
import { Api } from "../api";
import { IColaboratorIdentify } from "../../pages/TicketPage/interfaces/IColaboratorIdentify";

export const GetColaboratorByIdentification = async (identify: IColaboratorIdentify): Promise<AxiosResponse<IBaseResponse<IColaborador | undefined>, any> | undefined> => {
	try { 
		const response = await Api.get(`/colaborators/identify`, { params: identify });
    
		return response;
	} catch (error) {
		return undefined;
	}
};