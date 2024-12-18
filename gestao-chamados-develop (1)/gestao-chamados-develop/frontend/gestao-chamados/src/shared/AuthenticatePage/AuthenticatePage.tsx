import { Fragment, ReactNode, useEffect, useState } from "react";
import { RolesEnum } from "../../pages/Admin/User/enums/RoleEnum";

interface IAuthenticatePage {
  roles?: RolesEnum[];
  children: ReactNode;
  role?:RolesEnum
}

function AuthenticatePage({ roles, children, role }: IAuthenticatePage) {
	
	const [isRightRole, setIsRightRole] = useState<boolean | undefined>(false);

	useEffect(() => {
		setIsRightRole(roles?.some(t =>(t === role)) || roles?.some(t =>(t === RolesEnum["DEFAULT"])));
	}, [roles, role]);
  

	return (
		<Fragment>
			{isRightRole ? children : <h1>Página não encontrada</h1>}
		</Fragment>
	);
}

export default AuthenticatePage;