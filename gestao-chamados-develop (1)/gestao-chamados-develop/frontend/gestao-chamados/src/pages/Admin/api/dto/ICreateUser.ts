import { ProjectsEnum } from "../../User/enums/ProjectEnum";
import { RolesEnum } from "../../User/enums/RoleEnum";

export interface ICreateUserDTO {
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    roles: IUserRoles[];
}

interface IUserRoles {
    role: RolesEnum;
    project: ProjectsEnum;
}