// import { ProjectsEnum } from "../../../pages/Admin/User/enums/ProjectEnum";
// import { RolesEnum } from "../../../pages/Admin/User/enums/RoleEnum";

export interface IListUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    // roles: IUserRoles[];
    area: string;
    layout?: any;

}
// interface IUserRoles {
//     role: RolesEnum;
//     project: ProjectsEnum;
// }