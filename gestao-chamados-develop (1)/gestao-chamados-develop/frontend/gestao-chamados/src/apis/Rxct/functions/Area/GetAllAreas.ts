import { axiosInstance } from "../../../axios.config"
import { AREA_URL } from "../../../endpoint.config"

export const getAllAreas = async () => {
    const allAreas = await axiosInstance.get(`${AREA_URL}`);
    return allAreas.data;
}