import { axiosInstance } from "../../../axios.config";
import { AREA_URL } from "../../../endpoint.config";
import { IListArea } from "../../dto/IListArea";

export const updateArea = async (data: IListArea, idArea: string) => {
    try {
        await axiosInstance.patch(`${AREA_URL}/${idArea}`, data)
    } catch(error) {
        console.log("Erro no momento de atualizar a área!")
    }
}