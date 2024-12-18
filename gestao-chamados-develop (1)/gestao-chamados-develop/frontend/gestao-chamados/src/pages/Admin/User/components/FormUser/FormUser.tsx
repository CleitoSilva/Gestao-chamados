import React, { ChangeEvent,  forwardRef, useContext, useEffect, useState } from "react";
import TextInput from "../../../../../components/TextInput/TextInput";
import "./FormUser.css";
import { RolesEnum } from "../../enums/RoleEnum";
import { ProjectsEnum } from "../../enums/ProjectEnum";
import { ICreateUserDTO } from "../../../api/dto/ICreateUser";
import { IOption } from "../../../../../interfaces/IOption";
import { UserContext } from "../../../../../contexts/UserContext";

interface FormUserProps {
    onSubmitForm: (formData:ICreateUserDTO) => void;
    data?: ICreateUserDTO;
	onChangeForm: (formData:ICreateUserDTO)=>void;
}

export interface FormUserHandles {
    submitForm: () => void;
}

const DEFAULT_USER: ICreateUserDTO = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: RolesEnum.DEFAULT,
	roles: [{
		role: RolesEnum.DEFAULT,
		project: ProjectsEnum.RTDA,
	}],
};


function FormUserComponent(props: FormUserProps, ref: React.ForwardedRef<HTMLFormElement>) {
	const { onSubmitForm, data, onChangeForm } = props;
	const [formData, setFormData] = useState<ICreateUserDTO>(DEFAULT_USER);
    
	const { user } = useContext(UserContext);


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		onChangeForm(formData);
	}, [formData]);
	

	const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			e.preventDefault();
			if (formData)
				onSubmitForm(formData);
		}
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const getRolesOfType = () => {
		const rolesArr: IOption[] = [];
		Object.keys(RolesEnum).forEach((key: string) => {
			const enumKey = key as keyof typeof RolesEnum;
			if (enumKey.length > 2) {
				const value: IOption = {
					display: enumKey,
					value: RolesEnum[enumKey],
				};
				rolesArr.push(value);
			}
		});

		return (
			<>
				{
					rolesArr.map((role) => <option key={role.display + role.value} value={role.display}>{role.value}</option>)
				}
			</>
		);
	};
	useEffect(() => {
		if(data && data !== undefined) {
			setFormData(data);
		} else {
			setFormData({ ...DEFAULT_USER});
		}
	}, [data?._id]); 

	return (
		<form className="form-user" ref={ref} onSubmit={(e) => e.preventDefault()} onKeyDown={handleSubmit}>
			<div className="row">
				<TextInput
					name="name"
					label="Nome"
					value={formData ? formData.name : ""}
					onChange={handleChange}
				/>
				<TextInput
					name="email"
					label="E-mail"
					value={formData ? formData.email : ""}
					onChange={handleChange}
				/>
			</div>

			{!data?._id && (
				<div className="row">
					<TextInput
						name="password"
						label="Senha"
						type="password"
						onChange={handleChange}
					/>
					<TextInput
						name="confirmPassword"
						label="Confirmar Senha"
						type="password"
						onChange={handleChange}
					/>
				</div>
			)
			}
			<div className="row">
				<select
					name="role"
					onChange={handleSelectChange}
					value={formData ? formData.role : RolesEnum.DEFAULT}
					// disabled={user && formData ? user._id === formData._id : false}
				>
					{getRolesOfType()}
				</select>
			</div>
		</form>
	);
}

export const FormUser = forwardRef<HTMLFormElement, FormUserProps>(FormUserComponent);