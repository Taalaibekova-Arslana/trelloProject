import { FC, ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
	openIs: boolean;
	closeIs: () => void;
	children: ReactNode;
}

const StyledModalOv = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.193);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledModalContent = styled.div`
	width: 400px;
	height: 400px;
	background: white;
	padding: 30px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	/* justify-content: center;
		align-items: center; */
`;
const StyledCloseButton = styled.button`
	width: 40px;
	cursor: pointer;
	background: #007bff;
	color: white;
	border: none;
	padding: 10px;
	border-radius: 5px;
	margin-top: 10px;
`;
const Modal: FC<ModalProps> = ({ openIs, closeIs, children }) => {
	if (!openIs) return null;
	return (
		<StyledModalOv onClick={closeIs}>
			<StyledModalContent onClick={(e) => e.stopPropagation()}>
				<StyledCloseButton onClick={closeIs}>X</StyledCloseButton>
				{children}
			</StyledModalContent>
		</StyledModalOv>
	);
};

export default Modal;
