import { useNavigate } from "react-router-dom";
import IMenuItem from "../../interfaces/IMenuItem";
import "./MenuItem.css";

interface IMenuItemProps extends IMenuItem {
  isActive: boolean;
  callback?: () => void;
  factorySectorId?:string;
}

export function MenuItem({ title, to, icon, isActive, callback, factorySectorId }: IMenuItemProps) {
	const navigate = useNavigate();

	const handleNavigate = () => {
		if (callback) callback();

		navigate(to, {state:{factorySectorId}});
	};

	return(
		<button onClick={handleNavigate} className={`menu-item ${isActive ? "active" : ""}`}>
			<span className="menu-icon">{icon}</span>
			<p>{title}</p>
		</button>
	);
}

export default MenuItem;