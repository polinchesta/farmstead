import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../../types/farmsteadsTypes';
import farmsteadsApi from '../../api/farmstead/farmsteadsApi';
import axios from 'axios';

interface FarmsteadsStateType {
    comment: CommentType[] | null;
    error: string | null;
    loading: boolean;
}

const initialState: FarmsteadsStateType = {
    comment: [],
    error: null,
    loading: false,
};


export const getComment = createAsyncThunk<
  CommentType[],
  number,
  { rejectValue: string }
>('comments/fetchComments', async (farmsteadId, thunkAPI) => {
  try {
    const response = await axios.get<CommentType[]>(
      `http://localhost:3002/comments?farmsteadId=${farmsteadId}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch comments');
  }
});

const commentSlice = createSlice({
    name: 'farmstead',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getComment.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload ?? null;
        });
        builder.addCase(getComment.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.comment = payload; 
        });
        
    },
});

export const commentActions = {
    ...commentSlice.actions,
    getComment
};

const commentReducer = commentSlice.reducer;
export default commentReducer;
