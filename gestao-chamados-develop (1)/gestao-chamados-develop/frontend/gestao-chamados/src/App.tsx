import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./shared/Routes";
import AuthenticatePage from "./shared/AuthenticatePage/AuthenticatePage";
import { Login } from "./pages";
import { IsAuth } from "./shared/IsAuth/IsAuth";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
	const { role } = useContext(UserContext);

	return (
		<Router basename={process.env.REACT_APP_MY_PUBLIC_URL}>
			<Routes>
				<Route element={<IsAuth />}>
					{routes.map(r => 
						<Route key={r.path} path={r.path} element={
							<AuthenticatePage role={role} roles={r.roles}>
								{r.element}
							</AuthenticatePage>
						} />
					)}
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;

