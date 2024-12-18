import React, { Fragment, useContext, useState } from "react";
import { BiSolidPencil as EditIcon } from "react-icons/bi";
import { BsTrashFill as TrashIcon } from "react-icons/bs";
import "./UsersList.css";
import Pagination from "../../../../../components/Pagination/Pagination";
import { useManageUserDataTable } from "../../hooks/useManageDataTable";
import { IPaginatedUser } from "../../../dtos/Ipaginated";

import { IoMdKey as PasswordIcon } from "react-icons/io";
import ModalChangePassword from "../../../../../components/ModalChangePassword/ModalChangePassword";
import { IListUser } from "../../../dtos/IListUser";
import { UserContext } from "../../../../../contexts/UserContext";
import { Modal } from "../../../../../components/Modal/Modal";
import ConfirmAction from "../../../../../components/ConfirmAction/ConfirmAction";
import { Button } from "../../../../../components";
// import { NotificationContext } from "../../../../../contexts/NotificationContext";

interface IUsersListProps {
	users: IPaginatedUser | undefined;
	currPage: number;
	setCurrPage: (page: number) => void;
	handleUpdateUser: (id: string) => void;
	handleDeleteUser: (id?: string) => void;
}

export const UsersList: React.FC<IUsersListProps> = ({ users, currPage, setCurrPage, handleUpdateUser, handleDeleteUser }) => {
	const { getUserRoles } = useManageUserDataTable();

	const [userSelected, setUserSelected] = useState<IListUser>();
	const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const { user } = useContext(UserContext);

	const handleDelete = () => {
		handleDeleteUser(userSelected ? userSelected._id : undefined);
		setShowConfirmation(false);
	};

	return (
		<Fragment>
			<div className="user-table-wrapper">
				<table className="users-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Usuário</th>
							<th>Cargo</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{users && users.data.length > 0 && users.data.map((userEntry) => (
							<tr key={userEntry._id}>
								<td>{userEntry.name}</td>
								<td>{userEntry.email}</td>
								<td>{getUserRoles(userEntry.roles)}</td>
								<td className="action-cell">
									<Button onClick={() => handleUpdateUser(userEntry._id)}>
										<EditIcon size={24} />
									</Button>
									<Button theme="warning" onClick={() => {
										setUserSelected(userEntry);
										setShowPasswordModal(true);
									}}>
										<PasswordIcon size={24} />
									</Button>
									{/* {user && user._id !== userEntry._id &&
										<Button
											theme="error"
											onClick={() => {
												setUserSelected(userEntry)
												setShowConfirmation(true)
											}}>
											<TrashIcon size={24} />
										</Button>
									} */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination
				currentPage={currPage}
				totalAmountOfPages={users ? users.count : 0}
				onChange={(page: number) => setCurrPage(page)}
			/>
			<ModalChangePassword
				idUser={userSelected ? userSelected._id : ""}
				nameUser={userSelected ? userSelected.name : ""}
				show={showPasswordModal}
				close={() => setShowPasswordModal(false)}
				isUser={false}
			/>
			<Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
				<ConfirmAction
					title="Excluir Usuário?"
					text={`Você está prestes a excluir o usuário ${userSelected?.name}, tem certeza que deseja prosseguir com essa ação?`}
					action={handleDelete}
					close={() => setShowConfirmation(false)}
					confirmColor="#c52902"
					cancelColor="#868686"
				/>
			</Modal>
		</Fragment>
	);
};