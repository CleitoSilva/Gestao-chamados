// import { IUser } from "../../../interfaces/IUser";
// import { ProjectsEnum } from "../../../pages/Admin/User/enums/ProjectEnum";
// import { RolesEnum } from "../../../pages/Admin/User/enums/RoleEnum";

export interface ICreateUserDTO {
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    area: string;
    role: any;
    // roles: IUserRoles[];
}

// interface IUserRoles {
//     role: RolesEnum;
//     project: ProjectsEnum;
// }