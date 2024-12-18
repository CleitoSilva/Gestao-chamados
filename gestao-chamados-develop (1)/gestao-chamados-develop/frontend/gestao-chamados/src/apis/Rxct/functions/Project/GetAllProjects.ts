import { IProject } from "../../../../interfaces/IProject";
import { axiosInstance } from "../../../axios.config";
import { PROJECT_URL } from "../../../endpoint.config";

export const getAllProjects = async (): Promise<IProject[]> => {
    const allProjects = await axiosInstance.get(`${PROJECT_URL}`);
    return allProjects.data;
}