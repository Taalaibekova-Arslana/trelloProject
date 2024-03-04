import styled from "styled-components";
import logo from "../../assets/Trellologo.svg.png";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { postRequest } from "../../redux/tools/loginSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const StyledDivBackground = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgb(250, 251, 252);
	background-image: url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/trello-left.4f52d13c.svg),
		url(https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/trello-right.3ee60d6f.svg);
	background-repeat: no-repeat, no-repeat;
	background-attachment: fixed, fixed;
	background-size: 368px, 368px;
	background-position: left bottom, right bottom;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledDivContent = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;
const StyledDivCard = styled.div`
	width: 500px;
	height: 900px;
	box-shadow: 0px 0px 10px rgba(34, 33, 33, 0.2);
`;
const StyledImgLogo = styled.img`
	width: 180px;
`;

const Styledh2Text = styled.h2`
	font-size: 20px;
`;
const StyledParagraf = styled.p`
	width: 400px;
	font-size: 13px;
	cursor: pointer;
`;

const StyledButton = styled.button`
	width: 400px;
	height: 40px;
	border: 1px solid black;
	background-color: white;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	img {
		width: 27px;
	}
`;
const RegistrationPage = () => {
	// const trello = useAppSelector((state) => state.reducerLogin.user);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [img, setImg] = useState("");

	const addTrello = () => {
		if (login === "" || password == "" || img === "") {
			toast.error("Заполните поле");
		} else {
			const newData = {
				login: login,
				password: password,
				img: img,
			};
			toast.success("Вы успешно зарегистировались");
			dispatch(postRequest(newData)).then(() => {
				navigate("/login");
			});
			setLogin("");
			setPassword("");
			setImg("");
		}
	};

	const toLogin = () => {
		navigate("/login");
	};

	return (
		<StyledDivBackground>
			<StyledDivCard>
				<StyledDivContent>
					<StyledImgLogo src={logo} alt="" />
					<Styledh2Text>Зарегистрируйтесь, чтобы продолжить</Styledh2Text>
					<TextField
						style={{ width: "400px" }}
						id="outlined-basic"
						label="Введите ваш адрес эл.почту"
						variant="outlined"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<TextField
						style={{ width: "400px" }}
						id="outlined-basic"
						label="Введите ваш пароль "
						variant="outlined"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						style={{ width: "400px" }}
						id="outlined-basic"
						label="Ваша фотография "
						variant="outlined"
						value={img}
						onChange={(e) => setImg(e.target.value)}
					/>
					<StyledParagraf>
						Регистрируясь, я соглашаюсь с Условиями использования продуктов
						Cloud и принимаю Политику конфиденциальности Atlassian.
					</StyledParagraf>
					<Button onClick={addTrello} variant="contained">
						Зарегистрироваться
					</Button>
					<ToastContainer />
					<p>Или продолжить с помощью: </p>
					<StyledButton>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/google-logo.5867462c.svg"
							alt=""
						/>
						Google
					</StyledButton>
					<StyledButton>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/microsoft-logo.c73d8dca.svg"
							alt=""
						/>
						Microsoft
					</StyledButton>
					<StyledButton>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/apple-logo.54e0d711.svg"
							alt=""
						/>
						Apple
					</StyledButton>
					<StyledButton>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/slack-logo.5d730c10.svg"
							alt=""
						/>
						Slack
					</StyledButton>
					<p onClick={toLogin}>Уже есть аккаунт Atlassian? Войти</p>
					<p style={{ color: "black", fontSize: "12px" }}>
						Один аккаунт для Trello, Jira, Confluence и не только.
					</p>
				</StyledDivContent>
			</StyledDivCard>
		</StyledDivBackground>
	);
};

export default RegistrationPage;
