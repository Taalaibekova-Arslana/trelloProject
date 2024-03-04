import { styled } from "styled-components";
import logo from "../../../assets/Trellologo.svg.png";

const HeaderDiv = styled.div`
	position: fixed;

	width: 100%;
	height: 50px;
	background-color: white;
`;
const StyledHeaderDiv = styled.div`
	display: flex;
	gap: 20px;
`;
const ImageLogo = styled.img`
	width: 150px;
`;
const StyledUl = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;
const StyledLi = styled.li``;
const Header = () => {
	return (
		<HeaderDiv>
			<div className="container">
				<StyledHeaderDiv>
					<ImageLogo src={logo} alt="" />
					<StyledUl>
						<StyledLi>Возможности</StyledLi>
						<StyledLi>Решение</StyledLi>
						<StyledLi>Планы</StyledLi>
						<StyledLi>Ресурсы</StyledLi>
					</StyledUl>
				</StyledHeaderDiv>
			</div>
		</HeaderDiv>
	);
};

export default Header;
