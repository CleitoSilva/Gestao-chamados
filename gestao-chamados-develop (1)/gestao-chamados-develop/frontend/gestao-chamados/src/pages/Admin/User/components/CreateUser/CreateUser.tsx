import { FC, useEffect, useRef, useState } from "react";
import "./CreateUser.css";
import { ICreateUserDTO } from "../../../api/dto/ICreateUser";
import { RolesEnum } from "../../enums/RoleEnum";
import { ProjectsEnum } from "../../enums/ProjectEnum";
import { createUser } from "../../../api/functions/User/CreateUser";
import { updateUser } from "../../../api/functions/User/UpdateUser";
import { getUserById } from "../../../api/functions/User/GetUserById";
import { FormUser } from "../FormUser/FormUser";
import { IUserRoles } from "../../../dtos/IListUser";


interface ICreateUser {
    close(): void;
    refresh(): void;
    idUser?: string;
}

export const CreateUser: FC<ICreateUser> = ({ close, refresh, idUser }) => {
	const formUserRef = useRef<HTMLFormElement>(null);
	const [user, setUser] = useState<ICreateUserDTO>();

    
	const submitCreate = async (formData: ICreateUserDTO) => {
		if (!idUser || idUser == undefined) {
			const roleKey = formData.role as keyof typeof RolesEnum;

			const roles = [{
				role: RolesEnum[roleKey],
				project: ProjectsEnum.CENTERLINE,
			}];

			await createUser({ ...formData, roles: roles });
			close();
			refresh();
		} else {
			const roleKey = formData.role as keyof typeof RolesEnum;

			// const roles = [{
			//     role: RolesEnum[roleKey],
			//     project: ProjectsEnum.CENTERLINE,
			// }];

			formData.roles = formData.roles.filter(t => t.project !== ProjectsEnum.CENTERLINE);
			formData.roles.push({
				role: RolesEnum[roleKey],
				project: ProjectsEnum.CENTERLINE,
			});

			const updatedFormData = { ...formData, id: idUser, roles: formData.roles };

			if(updatedFormData._id){
				await updateUser(updatedFormData._id, updatedFormData);
			}

			close();
			refresh();
		}
	};


	const getUserRoles = (roles: IUserRoles[]) => {
		const role = roles.find(role => role.project === ProjectsEnum.CENTERLINE);
		return role ? role.role : "-";
	};


	const loadUser = async () => {
		if (idUser) {
			const userResponse = await getUserById(idUser) as ICreateUserDTO;

			const userModified = { ...userResponse, role: getUserRoles(userResponse.roles) };

			setUser(userModified);
		}
	};


	useEffect(() => {
		if (idUser) {
			loadUser();
		}
	}, [idUser]);


	const handleCreateClick = (dataToSubmit:ICreateUserDTO) => {
		submitCreate(dataToSubmit);
	};


	const handleChange = (e:ICreateUserDTO) =>{
		setUser((prev)=>({...prev, ...e}));
	};

	return (
		<section className="create-user-container">
			<header className="create-user-header">
				<h2>
					{idUser ? "Atualizar Usuário" : "Criar Usuário"}
				</h2>
				<button className="close" onClick={close}>
                    &times;
				</button>
			</header>
			<article>
				<FormUser onChangeForm={(e)=>handleChange(e)} ref={formUserRef} onSubmitForm={submitCreate} data={user} />
			</article>
			<footer className="create-user-footer">
				<button onClick={()=> user && handleCreateClick(user)}>
					{idUser ? "Atualizar Usuário" : "Criar"}
				</button>
			</footer>
		</section>
	);
};
