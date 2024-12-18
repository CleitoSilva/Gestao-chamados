import { axiosTokenInstance } from "./../axios.config";
import { AUTH_URL } from "../endpoint.config";

export const PasswordChange = async (id: string, previousPassword?: string, newPassword?: string): Promise<string | undefined> => {
	try {
		const res = await axiosTokenInstance
			.patch(`${AUTH_URL}/password`, {
				id: id,
				previousPassword: previousPassword,
				newPassword: newPassword
			});

		return res.data;
	} catch(error) {
		console.error("Erro ao mudar a senha: " + error);

		return undefined;
	}
}; 