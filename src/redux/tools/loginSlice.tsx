import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface TypeLogin {
	_id: number;
	login: string;
	password: string;
	img: string;
}

export interface TypeState {
	loading: boolean;
	error: string | null;
	user: TypeLogin[];
}

const initialState: TypeState = {
	loading: false,
	error: null,
	user: [],
};

interface TypeTrelloNewData {
	login: string;
}
export interface PatchData {
	newData: Partial<TypeLogin>;
	_id: number;
}

const url =
	"https://api.elchocrud.pro/api/v1/d48818cba24b8ff684f92dd1ab48a279/user";	

export const postRequest = createAsyncThunk(
	"user/postRequest",
	async (newData: TypeTrelloNewData) => {
		try {
			const response = await axios.post(url, newData);
			return response.data;
		} catch (error) {
			console.log("error", error);
		}
	}
);

export const getRequest = createAsyncThunk("user/getRequest", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log("error", error);
	}
});

const loginSlice = createSlice({
	name: "trelloSlice",
	initialState,
	reducers: {
		addTrello: (state, action) => {
			state.user.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			// !GET
			.addCase(getRequest.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			// !POST
			.addCase(postRequest.pending, (state) => {
				state.loading = true;
			})
			.addCase(postRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.user = state.user.concat(action.payload);
			})
			.addCase(postRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			});
	},
});

export const { addTrello } = loginSlice.actions;
export const LoginReducer = loginSlice.reducer;
