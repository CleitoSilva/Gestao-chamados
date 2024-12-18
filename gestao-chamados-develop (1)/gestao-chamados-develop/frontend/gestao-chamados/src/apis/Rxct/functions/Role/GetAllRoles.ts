import { axiosInstance } from "../../../axios.config"
import { ROLE_URL } from "../../../endpoint.config"

export const getAllRoles = async () => {
    const result = await axiosInstance.get(`${ROLE_URL}`);
    return result.data;
}