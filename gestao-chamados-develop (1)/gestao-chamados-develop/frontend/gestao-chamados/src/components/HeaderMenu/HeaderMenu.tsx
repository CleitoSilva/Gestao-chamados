import { useLocation } from "react-router-dom";
import { options } from "../../shared/MenuOptions";
import {MenuListItems} from "../../components/MenuListItems/MenuListItems";
import Symbol from "../../assets/images/unilever-2-logo-black-and-white.png";
import RxctLogo from "../../assets/images/Logo-white-color.svg";
import "./HeaderMenu.css";

export function HeaderMenu() {
	const location = useLocation();
	
	const getCurrentRoute = (curr: string) => {
		const cs = curr.split("/");

		return "/" + (cs.length > 1 ? cs[1] : "");
	};

	return (
		<nav className="menu-header">
			<section>
				<article>
					<MenuListItems 
						items={options} 
						currentRoute={getCurrentRoute(location.pathname)} 
						callback={() => null}
					/>
				</article>
				<span className="menu-brand-logo">
					<div className="open">
						<img src={Symbol} alt="Unilever-Menu" />
						<img src={RxctLogo} alt="Rxct-logo" className="rxct" />
					</div>
				</span>
			</section>
		</nav>
	);
}