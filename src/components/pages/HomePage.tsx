import styled from "styled-components";
import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const StyledHomePageDiv = styled.div`
	height: 1000px;
	background: url(//images.ctfassets.net/rz1oowkt5gyp/7lTGeXbBRNRLaVk2MdBjtJ/99c266e…/white-wave-bg.svg)
			center bottom -0.5px / 100% 14% no-repeat scroll padding-box border-box,
		linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180)) 0% 0% / auto
			repeat scroll padding-box border-box rgb(82, 67, 170);
	background-blend-mode: normal, normal;
	color: rgb(255, 255, 255);
`;

const StyledDivContent = styled.div`
	display: flex;
	gap: 100px;
`;
const StyledH1 = styled.h1`
	margin-top: 130px;
	font-size: 50px;
	font-family: "Courier New", Courier, monospace;
`;
const StyledP = styled.p`
	margin-top: 30px;
	margin-bottom: 20px;
	color: white;
	font-size: 20px;
`;
const StyledImg = styled.img`
	margin-top: 130px;
	width: 580px;
`;
const HomePage = () => {
	const navigate = useNavigate();
	const toLogin = () => {
		navigate("/login");
	};
	return (
		<StyledHomePageDiv>
			<div className="container">
				<StyledDivContent>
					<div>
						<StyledH1>
							Trello помогает собрать всех сотрудников, задачи и инструменты в
							одном месте
						</StyledH1>
						<StyledP>
							Объедините все в одном месте, даже если участники вашей команды
							рассеяны по миру.
						</StyledP>
						<Button onClick={toLogin} variant="contained">
							Зарегистрируйтесь или войдите
						</Button>
					</div>
					<StyledImg
						src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=960&fm=webp"
						alt=""
					/>
				</StyledDivContent>
			</div>
		</StyledHomePageDiv>
	);
};

export default HomePage;
