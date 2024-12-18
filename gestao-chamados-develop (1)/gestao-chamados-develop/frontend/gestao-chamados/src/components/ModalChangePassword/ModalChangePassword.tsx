import { useContext, useEffect, useState } from "react";
import {Modal} from "../Modal/Modal";
import PasswordInput from "../PasswordInput/PasswordInput";

import "./ModalChangePassword.css";

import { RxCross2 as CloseIcon } from "react-icons/rx";
import { IoInformationCircleOutline as InfoIcon } from "react-icons/io5";
import { PasswordChange } from "../../apis/Auth/Password.endpoint";
import { NotificationContext } from "../../contexts/NotificationContext";
import { PasswordAdminChange } from "../../apis/Auth/Password.admin.endpoint";

interface IModalChangePassword {
  idUser: string;
  nameUser: string;
  show: boolean;
  close: () => void;

  isUser: boolean;
}

function ModalChangePassword({ idUser, nameUser, show, close, isUser }: IModalChangePassword) {
	const [previousPassword, setPreviousPassword] = useState<string>();
	const [newPassword, setNewPassword] = useState<string>();
	const [confirmPassword, setConfirmPassword] = useState<string>();

	const [message, setMessage] = useState<string>();

	const { notify } = useContext(NotificationContext);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (message)
				setMessage(undefined);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [message]);

	const handleChangePassword = async () => {
		if (!newPassword) {
			setMessage("A nova senha está vazia!");
			return;
		}

		if (previousPassword === newPassword) {
			setMessage("A senha antiga é igual a nova!");
			return;
		}

		if (newPassword != confirmPassword) {
			setMessage("A confirmação de senha difere da nova senha!");
			return;
		}

		let res = undefined;

		if (isUser)
			res = await PasswordChange(idUser, previousPassword, newPassword);
		else
			res = await PasswordAdminChange(idUser, newPassword);

		if (res) {
			notify.success(res);

			setPreviousPassword(undefined);
			setNewPassword(undefined);
			setConfirmPassword(undefined);
		} else {
			setMessage("Ocorreu um erro ao alterar a senha!");
			return;
		}

		close();
	};

	return (
		<Modal onClose={close} isOpen={show}>
			<section className="change-password-container">
				<div className="change-password-header">
					<span>
						<h2>Alterar Senha</h2>
						<h5>de {nameUser}</h5>
					</span>
					<button onClick={close}>
						<CloseIcon />
					</button>
				</div>
				<div className="change-password-area">
					{isUser && <PasswordInput label="Senha antiga:" value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} />}
					<PasswordInput label="Nova Senha:" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
					<PasswordInput label="Confirmar Senha:" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
					{message &&
            <span className="message"><InfoIcon size={20} />{message}</span>
					}
				</div>
				<div className="change-password-actions">
					<button className="submit" onClick={handleChangePassword}>Salvar</button>
					<button className="cancel" onClick={close}>Cancelar</button>
				</div>
			</section>
		</Modal>
	);
}

export default ModalChangePassword;