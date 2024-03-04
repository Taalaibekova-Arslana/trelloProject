import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface TrelloType {
	_id: number;
	title: string;
	values: {
		_id: number;
		valueTitle: string;
		comments: {
			_id: number;
			commentTitle: string;
		}[];
	}[];
}

export interface TypeState {
	loading: boolean;
	error: string | null;
	data: TrelloType[];
}

export const initialState: TypeState = {
	loading: false,
	error: null,
	data: [],
};

interface TypeTrelloNewData {
	title: string;
}

interface TypeTrelloPatch {
	_id: number;
	newItems: {
		title: string;
		values: {
			_id: number;
			valueTitle: string;
			comments: { _id: number; commentTitle: string }[];
		}[];
	};
}

const url =
	"https://api.elchocrud.pro/api/v1/a52eae45c29987c3ebdf54bccf023e18/trello";

export const postTrello = createAsyncThunk(
	"data/postTrello",
	async (newData: TypeTrelloNewData) => {
		const response = await axios.post(url, newData);
		return response.data;
	}
);

export const getTrello = createAsyncThunk("data/getTrello", async () => {
	const response = await axios.get(url);
	return response.data;
});

export const patchTrello = createAsyncThunk(
	"data/patchTrello",
	async ({ newItems, _id }: TypeTrelloPatch) => {
		const response = await axios.patch(`${url}/${_id}`, newItems);
		return response.data;
	}
);

export const putTrello = createAsyncThunk(
	"data/putTrello",
	async ({ newItems, _id }: TypeTrelloPatch) => {
		const response = await axios.put(`${url}/${_id}`, newItems);
		return response.data;
	}
);

export const deleteTrello = createAsyncThunk(
	"data/deleteTrello",
	async (_id: number) => {
		await axios.delete(`${url}/${_id}`);
		return _id;
	}
);

const TrelloSlice = createSlice({
	name: "TrelloSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTrello.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTrello.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getTrello.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// !postTrello
			.addCase(postTrello.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(postTrello.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// !patchTrello
			.addCase(patchTrello.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(patchTrello.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(patchTrello.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// !putTrello
			.addCase(putTrello.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(putTrello.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(putTrello.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// !deleteTrello
			.addCase(deleteTrello.fulfilled, (state, action) => {
				state.loading = false;
				state.data = state.data.filter((item) => item._id !== action.payload);
			});
	},
});

export const ReducersTrello = TrelloSlice.reducer;
