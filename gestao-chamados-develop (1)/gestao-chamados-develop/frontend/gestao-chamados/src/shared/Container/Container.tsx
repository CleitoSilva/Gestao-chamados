import { ReactNode } from "react";
import {Header, Menu} from "../../components";
import "./Container.css";

interface IContainer {
	title: string;
	project: string;
	children: ReactNode;
	isAdmin?: boolean;
    onClickLogOut:()=>void;
	userName:string;
}

function Container({ title, project, isAdmin=false, onClickLogOut, children, userName }: IContainer) {
	return (
		<main className="container-custom">
			<Header userName={userName} onClickLogout={()=>onClickLogOut()} title={title} project={project} isAdmin={isAdmin} />
			<article>
				{<Menu />}
				<section>
					{children}
					{/* <Footer /> */}
				</section>
				{/* <Footer /> */}
			</article>
		</main>
	);
}

export default Container;
