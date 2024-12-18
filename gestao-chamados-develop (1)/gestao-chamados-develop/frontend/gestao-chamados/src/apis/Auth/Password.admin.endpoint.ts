import { axiosTokenInstance } from "../../apis/axios.config";
import { AUTH_URL } from "../endpoint.config";

export const PasswordAdminChange = async (id: string, newPassword?: string): Promise<string | undefined> => {
	try {
		const res = await axiosTokenInstance
			.patch(`${AUTH_URL}/password-admin?project=rtda`, {
				id: id,
				newPassword: newPassword
			});

		return res.data;
	} catch(error) {
		console.error("Erro ao mudar a senha: " + error);

		return undefined;
	}
}; 