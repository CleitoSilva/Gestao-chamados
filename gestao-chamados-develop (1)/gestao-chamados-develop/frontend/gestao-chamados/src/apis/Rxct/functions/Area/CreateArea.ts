import { axiosInstance } from "../../../axios.config";
import { AREA_URL } from "../../../endpoint.config";
import { ICreateArea } from "../../dto/ICreateArea";

export const createArea = async (data: ICreateArea) => {
    try {
        const area = await axiosInstance.post(`${AREA_URL}`, data);
        return area.data;
    } catch(error) {
        console.log("Erro no momento de criar a área!")
    }
}