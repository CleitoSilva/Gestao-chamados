import { axiosInstance } from "../../../axios.config"
import { AREA_URL } from "../../../endpoint.config"

export const getAreaById = async (areaId: string) => {
    const area = await axiosInstance.get(`${AREA_URL}/${areaId}`);
    return area.data;
}