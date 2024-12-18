import { RolesEnum } from "../enums/RolesEnum";
import { ProjectsEnum } from "../pages/Admin/User/enums/ProjectEnum";
// import { IArea } from "./IArea";
import { IEntity } from "./IEntity";
import { IRole } from "./IRole";
// import { IRole } from "./IRole";

export interface IUser extends IEntity {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: IRole;
  roles: {
    role: RolesEnum;
    project: ProjectsEnum;
  }[];
}