import TextInput from "../../components/TextInput/TextInput";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { HiHome as HomeIcon } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { IUserCredentials } from "../../interfaces/IUserCredentials";
import { UserContext } from "../../contexts/UserContext";
import { useToken } from "../../hooks/TokenHook";
import { LoginUser } from "../../apis/Auth/Login.endpoint";
import { NotificationContext } from "../../contexts/NotificationContext";
import BackgroundImage from "../../assets/images/login-background.jpg";
import RxctIcon from "../../assets/images/logo-removebg-preview.png"
import "./Login.css";
import axios, { AxiosInstance } from "axios";
import { AUTH_URL } from "../../apis/endpoint.config";
import ChamadoImage from "../../assets/images/chamado.gif"

export const Login = () => {
	const navigate = useNavigate();
	const [userCredentials, setUserCredentials] = useState<IUserCredentials>({ userNameOrEmail: "", password: "" });
	const { setUser, setIsAuth} = useContext(UserContext);
	const { notify } = useContext(NotificationContext);
	const { token, setToken } = useToken();

	// useEffect(() => {
	// 	setUser(undefined);
	// 	setIsAuth(false);
	// }, []);

	const handleLogin = async () => {
		try {
			const payload = await LoginUser(userCredentials.userNameOrEmail, userCredentials.password);
			if (payload !== undefined) {
				setToken(payload.token);
				setIsAuth(true);
				setUserCredentials({ userNameOrEmail: "", password: "" });
				const axiosTokenInstanceFirstLogin: AxiosInstance = axios.create({
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
						"Authorization": `Bearer ${payload.token}`,
					}
				});
				const res = await axiosTokenInstanceFirstLogin.get(`${AUTH_URL}`);
				setUser(res.data.payload);
				notify.success("Seja bem vindo de volta " + res.data.payload.name);
				navigate("/config");
			} else {
				throw new Error("Login incorreto");
			}
		} catch (error) {
			notify.error("Login e senha incorretos");
		}
	};

return (
	<main className="login">
		<div className="brand-area">
			{/* <button
				type="button"
				className="back" onClick={() => navigate("/home")}
				title="Voltar para Home"><HomeIcon />
			</button> */}
			{/* <img className="unilever-brand" src={UnileverAnimated} alt="Logo Animado" onClick={() => navigate("/home")} /> Se quiser deixar o logo em baixo usa essa classe em vez da rxct_brand porém tem que arrumar*/}
			<img className="rxct-brand" src={RxctIcon} alt="rxct-icon" />
			<img className="backdrop" src={ChamadoImage} />
		</div>
		<section>
			<form className="login-form" method="POST" onSubmit={(e) => { e.preventDefault(); }}>
				<div className="login-text">
					<h2>Bem vindo</h2>
					<h1>a Gestão de Chamados!</h1>
					<p>Entre com suas credenciais de acesso</p>
				</div>
				<div className="login-inputs">
					<TextInput
						label="Usuário ou Email"
						icon={<UserIcon />}
						className="login"
						defaultValue={userCredentials.userNameOrEmail}
						onChange={(e) => setUserCredentials(prev => ({ ...prev, userNameOrEmail: e.target.value }))}
					/>
					<PasswordInput
						label="Senha"
						type="password"
						className="login"
						onChange={(e) => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
					/>
				</div>
				<div className="login-buttons">
					<button onClick={handleLogin}>Entrar</button>
				</div>
			</form>
		</section>
	</main>
);
};

export default Login;