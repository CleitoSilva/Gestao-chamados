import { ReactElement } from "react";
import { RolesEnum } from "../enums/RolesEnum";

interface IMenuItem {
  title: string;
  to: string;
  activeWhen: string;
  icon: ReactElement;
  // roles?: RolesEnum[]
  hasToBeLogged?: boolean;
}

export default IMenuItem;