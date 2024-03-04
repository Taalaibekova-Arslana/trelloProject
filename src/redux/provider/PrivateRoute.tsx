import { FC, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectRouteProps {
	children: ReactNode;
}

const PrivateRoute: FC<ProtectRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const isAuth = Boolean(localStorage.getItem("userId"));

	useEffect(() => {
		if (isAuth && (pathname === "/login" || pathname === "/registration")) {
			navigate("/user");
		} else if (!isAuth && pathname === "/user") {
			navigate("/login");
		}
	}, [isAuth, pathname, navigate]);

	return children;
};

export default PrivateRoute;
		