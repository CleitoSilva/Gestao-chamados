import { useContext, useEffect, useState } from "react";
import { ProjectsEnum } from "../enums/ProjectEnum";
import { IPaginatedUser } from "../../dtos/Ipaginated";
import { IUserRoles } from "../../dtos/IListUser";
import { getUserPaginated } from "../../api/functions/User/GetAllUsers";
import { NotificationContext } from "../../../../contexts/NotificationContext";
import { deleteUser } from "../../api/functions/User/DeleteUser";

export const useManageUserDataTable = () => {
	const [currPage, setCurrPage] = useState(1);
	const [users, setUsers] = useState<IPaginatedUser | undefined>();
	const [creating, setIsCreating] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>();

	const { notify } = useContext(NotificationContext);

	const getUsers = async () => {
		const users = await getUserPaginated(currPage - 1, 10);
		setUsers(users);
	};

	const getUserRoles = (roles: IUserRoles[]) => {
		const role = roles.find(role => role.project === ProjectsEnum.CENTERLINE);
		return role ? role.role : "-";
	};

	useEffect(() => {
		getUsers();
	}, [currPage]);

	const handleRefresh = async () => {
		const response = await getUserPaginated(currPage - 1, 10);
		setUsers(response);
	};

	const handleUpdateUser = (id: string) => {
		setIsCreating(true);
		setSelectedId(id);
	};

	const handleDeleteUser = async (userId?: string) => {
		try {
		
			if (!userId) {
				notify.error("Nenhum usuário foi passado para exclusão.");
				return;
			}

			await deleteUser(userId);

			notify.success("Usuário excluído com sucesso!");

			await handleRefresh();
		} catch(error) {
			notify.error("Ocorreu um erro ao excluir o usuário.");
		}
	};

	return {
		users,
		getUsers,
		currPage,
		setCurrPage,
		handleRefresh,
		creating,
		setIsCreating,
		handleUpdateUser,
		handleDeleteUser,
		selectedId,
		setSelectedId,
		getUserRoles
	};
};