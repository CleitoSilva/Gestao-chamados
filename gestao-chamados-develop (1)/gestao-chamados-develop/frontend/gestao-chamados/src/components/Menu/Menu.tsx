import { useLocation } from "react-router-dom";
import { options } from "../../shared/MenuOptions";
import {MenuListItems} from "../../components/MenuListItems/MenuListItems";
import RxctLogo from "../../assets/images/rxct-minimal-logo.svg";
import "./Menu.css";

export function Menu() {
	const location = useLocation();
	
	const getCurrentRoute = (curr: string) => {
		const cs = curr.split("/");
		return "/" + (cs.length > 1 ? cs[1] : "");
	};

	return (
		<nav className="menu collapse">
			<section>
				<article>
					<MenuListItems items={options} currentRoute={getCurrentRoute(location.pathname)} />
				</article>
				<span className="menu-brand-logo">
					<div className="logos">
						{/* <img src={Symbol} alt="Unilever-Menu" /> */}
						<img src={RxctLogo} alt="Rxct-logo" className="rxct" />
					</div>
					{/* : */}
					{/* <div className="open">
							<img src={Symbol} alt="Unilever-Menu" />
							<img src={RxctLogo} alt="Rxct-logo" className="rxct" />
						</div> */}
				</span>
			</section>
		</nav>
	);
}

export default Menu;