import { axiosInstance } from "../../../axios.config"
import { AREA_URL } from "../../../endpoint.config"
// import { IListArea } from "../../dto/IListArea";
import { IPaginatedArea } from "../../dto/IPaginated";

export const getAreasPaginated = async (skip: number, limit: number): Promise<IPaginatedArea> => {
    const areas = await axiosInstance.get(`${AREA_URL}/page?skip=${skip}&limit=${limit}`)
    return areas.data;
}