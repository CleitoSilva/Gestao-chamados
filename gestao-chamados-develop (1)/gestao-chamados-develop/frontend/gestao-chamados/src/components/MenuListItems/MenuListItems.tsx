import { Fragment, useContext } from "react";
import IMenuItem from "../../interfaces/IMenuItem";
import MenuItem from "../MenuItem/MenuItem";
import "./MenuListItems.css";
import { UserContext } from "../../contexts/UserContext";

interface IMenuListItems {
  items: IMenuItem[];
  currentRoute: string;
  callback?: () => void;
}

export function MenuListItems({ items, currentRoute, callback }: IMenuListItems) {
	const { isAuth, role } = useContext(UserContext);

	const handleSeeItem = (item: IMenuItem) => {
		if(item.hasToBeLogged && !isAuth) return false;
		// if (item.roles && !item.roles.find(t => t === role)) 
		// 	return false;
		return true;
	};
	return(
		<div className="menu-list-items">
			<ul>
				{items.map((item, index)=>(
					<Fragment key={index}>
						{handleSeeItem(item) && (
							<li>
								<MenuItem 
									title={item.title || ""}
									activeWhen={item.activeWhen}
									icon={item.icon}
									to={item.to}
									factorySectorId={""}
									callback={callback} 
									isActive={item.activeWhen === currentRoute}  />
							</li>
						)}
					</Fragment>
				))
				}
			</ul>
		</div>
	);
}
