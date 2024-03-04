import styled from "styled-components";
import logo from "../../assets/trelloLogo.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getRequest } from "../../redux/tools/loginSlice";
import TrelloPage from "./TrelloPage";
import logoSvg from "../../assets/logo1.svg";
import logoSvg1 from "../../assets/logo2.svg";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.div`
	/* position: fixed; */
	width: 100%;
	height: 45px;
	background-color: #892be2c1;
	display: flex;
	align-items: center;
	gap: 600px;
`;
const StyledUl = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	color: white;
`;
const StyledContent = styled.div`
	position: fixed;
	width: 100%;
	height: 1000px;
	background: url(https://mirpozitiva.ru/wp-content/uploads/2019/11/1477469523_cvety-gory.jpg)
		no-repeat center/cover;
	image-rendering: auto;
`;
const StyledLi = styled.li`
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const StyledImgPriofile = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50px;
	object-fit: cover;
	object-position: center;
`;
const StyledProfile = styled.div``;
const StyledInput = styled.input`
	width: 200px;
	height: 36px;
	border: 1px solid gray;
	background-color: #892be2aa;
	border-radius: 4px;
	font-size: 16px;
	color: white;
`;
const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const StyledButtonExit = styled.button`
	width: 70px;
	height: 30px;
	background-color: blueviolet;
`;

// !burger

const UserPage = () => {
	const trello = useAppSelector((state) => state.reducerLogin.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [profilePhoto, setProfilePhoto] = useState("");

	const userId = localStorage.getItem("userId");

	const userPhoto = () => {
		const userFind = trello.find((item) => item._id === Number(userId));
		if (userFind) {
			setProfilePhoto(userFind.img);
		}
	};
	useEffect(() => {
		userPhoto();
	}, [trello]);

	useEffect(() => {
		dispatch(getRequest());
	}, [dispatch]);

	const exitLogin = () => {
		localStorage.removeItem("userId");
		navigate("/login");
	};

	return (
		<div>
			<StyledHeader>
				<StyledUl>
					<img src={logo} alt="" />
					<StyledLi>Рабочие простронства</StyledLi>
					<StyledLi>Недавние</StyledLi>
					<StyledLi>В избранном</StyledLi>
					<StyledLi>Шаблоны</StyledLi>
				</StyledUl>
				<StyledDiv>
					<StyledInput type="text" placeholder="поиск" />
					<img src={logoSvg} alt="" />
					<img src={logoSvg1} alt="" />
					<StyledButtonExit	 onClick={exitLogin}>Exit</StyledButtonExit>
					<StyledProfile>
						{userId && profilePhoto ? (
							<StyledImgPriofile src={profilePhoto} alt="photo" />
						) : null}
					</StyledProfile>
				</StyledDiv>
			</StyledHeader>
			<StyledContent>
				<TrelloPage />
			</StyledContent>
		</div>
	);
};

export default UserPage;
