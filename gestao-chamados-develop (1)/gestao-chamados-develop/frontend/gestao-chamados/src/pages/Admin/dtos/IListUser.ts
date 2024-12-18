import { ProjectsEnum } from "../User/enums/ProjectEnum";
import { RolesEnum } from "../User/enums/RoleEnum";

export interface IListUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    roles: IUserRoles[];

}
export interface IUserRoles {
    role: RolesEnum;
    project: ProjectsEnum;
}