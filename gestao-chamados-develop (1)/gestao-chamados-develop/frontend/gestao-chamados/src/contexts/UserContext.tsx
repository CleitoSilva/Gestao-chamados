import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthUser } from "../apis/Auth/Auth.endpoint";
import { RolesEnum } from "../pages/Admin/User/enums/RoleEnum";
import { ProjectsEnum } from "../pages/Admin/User/enums/ProjectEnum";
import { useToken } from "../hooks/TokenHook";
import { IUsuario } from "../interfaces/IUsuario";

interface IUsuarioContext {
  user?: IUsuario | undefined;
  setUser: (user: IUsuario | undefined) => void;
  isAuth: boolean;
  setIsAuth: (nIsAuth: boolean) => void;
  role: RolesEnum | undefined;
  setRole: (role?: RolesEnum) => void;
  refreshUser: () => Promise<boolean>;
  menuOpened: boolean;
  setMenuOpened: (open: boolean) => void;
  handleLogout: () => void;
}

interface IUsuarioProvider {
  children: ReactNode;
}

export const UserContext = createContext<IUsuarioContext>({
	user: undefined,
	setUser: () => null,
	role: undefined,
	setRole: () => {},
	isAuth: false,
	setIsAuth: () => null,
	refreshUser: async () => await false,
	menuOpened: true,
	setMenuOpened: () => null,
	handleLogout: () => {}
});

// eslint-disable-next-line react/prop-types
export const UserProvider: React.FC<IUsuarioProvider> = ({children}) => {
	const [user, setUser] = useState<IUsuario>();
	const [menuOpened, setMenuOpened] = useState<boolean>(true);
	const [role, setRole] = useState<RolesEnum>();
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const {removeToken} = useToken();

	const handleUser = (loggedUser: IUsuario | undefined) => {
		setUser(loggedUser);
		setIsAuth(true);
	};

	const handleLogout = () => {
		setUser(undefined);
		setRole(undefined);
		setIsAuth(false);
		removeToken();
	};

	const authUserToken = async (): Promise<boolean> => {
		const user = await AuthUser();
		setUser(user);
		setLoading(false);
		if (!user) {
			setIsAuth(false);
			return false;
		}

		setIsAuth(true);
		return true;
	};

	useEffect(() => {
		authUserToken();
	}, []);

	return (
		<UserContext.Provider value={{user, setUser: handleUser, isAuth, setIsAuth, refreshUser: authUserToken, menuOpened, setMenuOpened, role, setRole, handleLogout }}>
			{
				loading 
					?
					<></>
					:
					children
			}
		</UserContext.Provider>
	);
};