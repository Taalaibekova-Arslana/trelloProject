import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
	deleteTrello,
	getTrello,
	patchTrello,
	postTrello,
	putTrello,
} from "../../redux/tools/trelloSlice";
import Modal from "./modal/Modal";

const StyledContentDiv = styled.div`
	display: flex;
	justify-content: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 20px;
`;

const StyledCardDiv = styled.div`
	width: 260px;
	height: 100%;
	background-color: #892be27c;
	border-radius: 6px;
`;

const StyledUl = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
const StyledLi = styled.li`
	width: 250px;
	height: 40px;
	background-color: #ca2be2;
	border-radius: 10px;
`;

const StyledInput = styled.input`
	width: 250px;
	height: 40px;
	background-color: #ca2be2;

	border-radius: 10px;
`;
const StyledButtonColonk = styled.button`
	width: 250px;
	height: 40px;
	background-color: #ffffff24;
	color: black;
	border-radius: 10px;
`;

const StyledInputColonk = styled.input`
	width: 250px;
	height: 40px;
	background-color: #892be264;
	border-radius: 10px;
	border: 1px solid black;
`;

const StyledButtonSpisok = styled.button`
	width: 140px;
	height: 30px;
	background-color: #4141e1d9;
	border-radius: 4px;
`;

const StyledButtonX = styled.button`
	width: 30px;
	height: 30px;
	background-color: #4141e1d9;
	border-radius: 4px;
`;

const StyledDivSpisok = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	height: 100px;
	background-color: #892be2c1;
	border-radius: 5px;
`;

const StyledButtonCard = styled.button`
	width: 250px;
	height: 40px;
	background-color: #ca2be228;
	border-radius: 10px;
	border: none;
`;

const StyledInputCard = styled.input`
	width: 250px;
	height: 40px;
	background-color: #ca2be228;
	border-radius: 10px;
	border: 1px solid black;
`;

const StyledDivText = styled.div`
	margin-top: 6px;
	display: flex;
	justify-content: center;
`;

const StyledImgIcon = styled.img`
	width: 30px;
`;

const StyledDivTextMain = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

// !modalka
const StyledInputCom = styled.input`
	width: 350px;
	height: 40px;
	background-color: #892be285;
	border-radius: 10px;
	border: none;
`;

const StuledSaveButton = styled.button`
	width: 60px;
	height: 40px;
	background-color: #ca2be2;
	border-radius: 10px;
`;

const TrelloPage = () => {
	const trello = useAppSelector((state) => state.reducerTrello.data);
	const dispatch = useAppDispatch();

	const [valueInput, setValueInput] = useState<string>("");
	const [showInput, setShowInput] = useState<boolean>(false);
	const [getValueInput, setGetValueInput] = useState<number | null>(null);
	const [newValueInput, setNewValueInput] = useState<string>("");
	const [edit, setEdit] = useState<number | null>(null);
	const [editValueInput, setEditValueInput] = useState<string>("");
	const [commentNew, setCommentNew] = useState<string>("");
	const [isModal, setIsModal] = useState<boolean>(false);
	useEffect(() => {
		dispatch(getTrello());
	}, [dispatch]);

	const postHandleTrello = () => {
		if (valueInput === "") {
			console.log("Please enter a title");
		} else {
			const newData = { title: valueInput, values: [] };
			dispatch(postTrello(newData));
			setValueInput("");
			setShowInput(false);
		}
	};

	const inputShowTrello = () => {
		setShowInput(true);
	};

	const patchHandleTrello = (_id: number, item: any, title: string) => {
		if (newValueInput === "") {
			console.log("error");
		} else {
			const newItems = {
				title,
				values: [
					...item.values,
					{
						valueTitle: newValueInput,
						_id: Math.random(),
						comments: [],
					},
				],
			};
			dispatch(patchTrello({ newItems, _id }));
			setNewValueInput("");
		}
	};

	const putHandleTrello = (newItem: any, _id: number) => {
		setEditValueInput(newItem.valueTitle);
		setEdit(_id);
	};

	const saveHandleTrello = (
		_id: number,
		values: any[],
		id: number,
		title: string
	) => {
		const newValue = values.map((el) => {
			if (el._id === id) {
				return {
					_id: el._id,
					valueTitle: editValueInput,
					comments: el.comments,
				};
			}
			return el;
		});
		const newItems = {
			title,
			values: newValue,
		};
		dispatch(putTrello({ newItems, _id }));
		setEdit(null);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const deleteHAndleTrello = (_id: number) => {
		dispatch(deleteTrello(_id));
	};

	return (
		<div>
			<br />
			<StyledContentDiv>
				<div>
					{showInput ? (
						<>
							<StyledDivSpisok>
								<StyledInputColonk
									type="text"
									value={valueInput}
									onChange={(e) => setValueInput(e.target.value)}
								/>
								<br />
								<div>
									<StyledButtonSpisok onClick={postHandleTrello}>
										Добавить список
									</StyledButtonSpisok>
									<StyledButtonX onClick={() => setShowInput(false)}>
										X
									</StyledButtonX>
								</div>
							</StyledDivSpisok>
						</>
					) : (
						<StyledButtonColonk onClick={inputShowTrello}>
							+Добавить еще одну колонку
						</StyledButtonColonk>
					)}
				</div>
				{trello.map((item) => (
					<StyledCardDiv key={item._id}>
						<StyledUl>
							<StyledDivTextMain>
								<h2>{item.title}</h2>
								<h3
									style={{
										marginLeft: "240px",
										position: "fixed",
										cursor: "pointer",
									}}
									onClick={() => deleteHAndleTrello(item._id)}>
									&#10006;
								</h3>
							</StyledDivTextMain>
							{item.values.map((newItem) => (
								<StyledLi key={newItem._id}>
									{newItem._id === edit ? (
										<>
											<div style={{ display: "flex" }}>
												<StyledInput
													style={{ cursor: "pointer" }}
													type="text"
													value={editValueInput}
													onChange={(e) => setEditValueInput(e.target.value)}
												/>
												<StuledSaveButton
													onClick={() =>
														saveHandleTrello(
															item._id,
															item.values,
															newItem._id,
															item.title
														)
													}>
													Save
												</StuledSaveButton>
											</div>
										</>
									) : (
										<>
											<StyledDivText>
												<h5
													onClick={() => putHandleTrello(newItem, newItem._id)}>
													{newItem.valueTitle}
												</h5>
												<h2
													style={{
														cursor: "pointer",
														marginLeft: "220px",
														position: "fixed",
													}}
													onClick={openModal}>
													<StyledImgIcon
														src="https://cdn-icons-png.flaticon.com/512/2182/2182946.png"
														alt=""
													/>
												</h2>
											</StyledDivText>
										</>
									)}
									<Modal
										openIs={isModal}
										closeIs={closeModal}
										children={
											<>
												<h3>{newItem.valueTitle}</h3>
												<h2>Comments не рабочий </h2>
												<StyledInputCom
													placeholder="comment"
													type="text"
													value={commentNew}
													onChange={(e) => setCommentNew(e.target.value)}
												/>

												<div>
													{newItem.comments &&
														newItem.comments.map((el) => (
															<div key={el._id}>
																<img src="" alt="" />
																<ul>
																	<li>{el.commentTitle}</li>
																</ul>
															</div>
														))}
												</div>
											</>
										}
									/>
								</StyledLi>
							))}
						</StyledUl>
						{item._id === getValueInput ? (
							<>
								<StyledInputCard
									type="text"
									value={newValueInput}
									onChange={(e) => setNewValueInput(e.target.value)}
								/>
								<br />
								<StyledButtonSpisok
									onClick={() => patchHandleTrello(item._id, item, item.title)}>
									Добавить карточку
								</StyledButtonSpisok>
								<StyledButtonX onClick={() => setGetValueInput(null)}>
									X
								</StyledButtonX>
							</>
						) : (
							<>
								<StyledButtonCard onClick={() => setGetValueInput(item._id)}>
									+Добавить карточку
								</StyledButtonCard>
							</>
						)}
					</StyledCardDiv>
				))}
			</StyledContentDiv>
		</div>
	);
};

export default TrelloPage;
