import IMenuItem from "../interfaces/IMenuItem";
import { BsGear } from "react-icons/bs";

export const options: IMenuItem[] = [
	{title: "Configuração", to: "/config", activeWhen: "/config", icon: <BsGear color="#fff"size={24}/> /*, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]*/},
	{title: "Abrir Chamado", to: "/criacao-chamado", activeWhen: "/criacao-chamado", icon: <BsGear color="#fff"size={24}/> /*, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]*/},
	{title: "Oficina", to: "/workshop", activeWhen: "/workshop", icon: <BsGear color="#fff"size={24}/> /*, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]*/},
	// {title: "Usários", to: "/admin", activeWhen: "/admin", icon: <BiUser color="#fff"size={24}/> /*, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]*/}
];