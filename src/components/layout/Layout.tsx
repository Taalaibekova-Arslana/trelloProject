import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import HomePage from "../pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import UserPage from "../pages/UserPage";

const LayoutDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	footer {
		margin-top: auto;
	}
`;

const Layout = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === "/";
	return (
		<LayoutDiv>
			{isLoginPage && <Header />}
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
			</main>
			<Footer />
		</LayoutDiv>
	);
};

export default Layout;
