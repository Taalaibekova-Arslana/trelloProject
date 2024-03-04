import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { LoginReducer } from "./tools/loginSlice";
import { ReducersTrello } from "./tools/trelloSlice";

export const store = configureStore({
	reducer: {
		reducerLogin: LoginReducer,
		reducerTrello: ReducersTrello,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
