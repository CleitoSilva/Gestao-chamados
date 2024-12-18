import { IRoute } from "../interfaces/IRoutes";
import { Login } from "../pages";
import { IndexUser } from "../pages/Admin/User/IndexUser/IndexUser";
import { RolesEnum } from "../pages/Admin/User/enums/RoleEnum";
import { Config } from "../pages/Config";
import { CriacaoChamado } from "../pages/CriacaoChamado";
import { Workshop } from "../pages/Workshop/Worskhop";
import TicketPage from "../pages/TicketPage/TicketPage";
import { TicketProvider } from "../pages/TicketPage/contexts/TicketContext";
import TicketsList from "../pages/TicketsList/TicketsList";

export const routes: IRoute[] = [
	{ path: "/", element: <Login /> },
	{ path: "/config", element: <Config/>, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]},
	{ path: "/criacao-chamado", element: <CriacaoChamado/>, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]},
	{ path: "/workshop", element: <Workshop/>, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]]},
	{ path: "/admin", element: <IndexUser />, roles:[RolesEnum["DEFAULT"], RolesEnum["ADMIN"]] },
	{ path: "/tickets", element: <TicketsList />, roles:[RolesEnum["DEFAULT"]] },
	{ path: "/ticket/:idTicket", element: <TicketProvider><TicketPage /></TicketProvider>, roles:[RolesEnum["DEFAULT"]] },
];

// analista é tudo que nao for usuario 
// admin é tudo e o usuario
// default é só visualização sem as configurações e sem usuario