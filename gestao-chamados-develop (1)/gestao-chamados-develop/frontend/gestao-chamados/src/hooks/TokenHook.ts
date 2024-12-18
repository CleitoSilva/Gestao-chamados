import { useState } from "react";

const TOKEN_KEY = "rxct_token";

export const useToken = () => {
	const [token, setTokenState] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

	const setToken = (newToken: string) => {
		localStorage.setItem(TOKEN_KEY, newToken);
		setTokenState(newToken);
		console.log("token setado:" + token)
	};

	const removeToken = () => {
		localStorage.removeItem(TOKEN_KEY);
		setTokenState(null);
	};

	return { token, setToken, removeToken };
};