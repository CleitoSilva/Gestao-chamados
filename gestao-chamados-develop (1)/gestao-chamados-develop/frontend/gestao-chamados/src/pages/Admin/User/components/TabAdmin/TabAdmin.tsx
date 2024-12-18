import { useNavigate } from "react-router-dom";
import { AdminEnum } from "../../../enums/admin.enum";
import "./TabAdmin.css";

interface ITabAdmin {
  activeTab?: number
}

function TabAdmin({ activeTab }: ITabAdmin) {
	const navigate = useNavigate();

	const getClass = (tab: number) => {
		if (activeTab === tab) return "active";

		return "";
	};

	const handleNavigate = (tab: number, route: string) => {
		if (activeTab !== tab) {
			navigate(route);
		}
	};

	return (
		<ul className="tab-crud">
			<li className={getClass(AdminEnum["User"])} onClick={() => handleNavigate(AdminEnum["User"], "/admin/usuarios")}>
        Usuários
			</li>
			{/* <li className={getClass(AdminEnum["Area"])} onClick={() => handleNavigate(AdminEnum["Area"], "/admin/areas")}>
				<AreasIcon />
        Áreas
			</li> */}
			{/* <li className={getClass(AdminEnum["Component"])} onClick={() => handleNavigate(AdminEnum["Component"], "/admin/componentes")}>
				<ComponentsIcon />
        Componentes
			</li> */}
		</ul>
	);
}

export default TabAdmin;