import { AiOutlineUser as UserIcon } from "react-icons/ai";
import { MdOutlineAdminPanelSettings as AdminIcon } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { VscThreeBars as HamburgerIcon } from "react-icons/vsc";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { HeaderMenu } from "../HeaderMenu";
import AppsModal from "./Components/AppsModal/AppsModal";
import { IoApps as AppsIcons } from "react-icons/io5";
import { UserButtonModal } from "./UserButtonModal/UserButtonModal";
import { useState } from "react";
// import Logo from "../../assets/images/rxct-minimal-logo.svg";
import Logo from "../../assets/images/Logo-white-color.svg";
import "./Header.css";

interface IHeader {
	title: string;
	project: string;
	isAdmin: boolean;
	onClickLogout: () => void;
	userName: string;
}

export function Header({ project, isAdmin, onClickLogout, userName }: IHeader) {

	const navigate = useNavigate();
	const location = useLocation();
	const [showUserModal, setShowUserModal] = useState(false);

	const getCurrentRoute = (curr: string) => {
		const cs = curr.split("/");

		return "/" + (cs.length > 1 ? cs[1] : "");
	};

	const getClassAdmin = () => {
		let classActive = "";

		if (getCurrentRoute(location.pathname) === "/admin") {
			classActive = "active";
		}

		return classActive;
	};

	const [showApps, setShowApps] = useState<boolean>(false);

	return (
		<header className="main-header">
			<h2>
				<button className="hamburger" >
					<HamburgerIcon />
				</button>
				<div className="img-area-header">
					<img className="header-img" src={Logo} alt="Rxct" />
				</div>
				<span>{project}</span>
			</h2>
			<ul className="header-options">
				<li title="Aplicativos" className="link-abroad icon">
					<a rel="noreferrer" onClick={() => setShowApps((prev) => !prev)}>
						<AppsIcons />
					</a>
				</li>
				{showApps && <AppsModal close={() => setShowApps(false)} />}
				{isAdmin && <li title="Administrador" className={`user-icon ${getClassAdmin()} `} onClick={() => {
					navigate("/admin");
				}}><span>Admin</span><i><AdminIcon /></i>
				</li>}
				<UserButtonModal
					onClickItem={(index) => index === 0 ? onClickLogout() : null}
					onClose={() => setShowUserModal(false)}
					items={[{ label: "sair", icon: <BsBoxArrowInLeft size={24} /> }]}
					userName={userName}
					isOpen={showUserModal}>
					<li title="Usuário" onClick={() => setShowUserModal(true)} className=" admin user-icon">
						<i>
							<UserIcon size={22} />
						</i>
					</li>
				</UserButtonModal>
			</ul>
			{/* <div className="menu-header">
				<HeaderMenu />
			</div> */}
		</header>
	);
}
