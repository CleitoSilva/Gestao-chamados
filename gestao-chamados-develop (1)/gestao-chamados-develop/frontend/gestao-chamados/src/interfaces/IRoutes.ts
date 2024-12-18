import { ReactElement } from "react";
import { RolesEnum } from "../pages/Admin/User/enums/RoleEnum";

export interface IRoute {
  path: string;
  element: ReactElement;
  roles?: RolesEnum[]
}