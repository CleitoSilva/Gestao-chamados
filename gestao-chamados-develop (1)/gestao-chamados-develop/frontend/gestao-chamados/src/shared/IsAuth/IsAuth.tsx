import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Container from "../Container/Container";
import { RolesEnum } from "../../pages/Admin/User/enums/RoleEnum";
import { LoginInfo } from "../../apis/Auth/LoginInfo.endpoint";
import { NotificationContext } from "../../contexts/NotificationContext";

export function IsAuth() {
	const { isAuth, handleLogout, role, user } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		!isAuth && navigate("/login");
		// if (user?.empresa?.id !== null && user?.empresa?.id !== undefined) {
		// 	localStorage.setItem("idEnterprise", user?.empresa?.id)
		// }
		localStorage.setItem("idEnterprise", "CBEAEBCA-BC65-4CBE-A52F-70600745F960")
	}, [isAuth]);

	return (isAuth ? <Container userName={user?.name || "não identificado"} onClickLogOut={() => handleLogout()} project="Gestão de Chamados" isAdmin={role === RolesEnum.ADMIN} title="Gestão de Chamados" children={<Outlet />} /> : <Login />);
}

