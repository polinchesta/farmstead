// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { FarmsteadsType, FarmsteadsFilterType } from '../../types/farmsteadsTypes';
// import farmsteadsApi from '../../api/farmstead/farmsteadsApi';

// interface FarmsteadsStateType {
//     topFarmsteads: Array<FarmsteadsType>;
//     error?: string;
//     loading: boolean;
// }

// const initialState: FarmsteadsStateType = {
//     topFarmsteads: [],
//     error: undefined,
//     loading: false,
// };

// const getTopFarmsteads = createAsyncThunk<
//   Array<FarmsteadsType>,
//   FarmsteadsFilterType,
//   { rejectValue: string }
// >('farmsteads/getTopFarmsteads', async (filter, thunkApi) => {
//   try {
//     const response = await farmsteadsApi.getTopFarmstead(filter);
//     const sortedFarmsteads = response.data.sort((a, b) => b.top - a.top);
//     const topFarmsteads = sortedFarmsteads.slice(0, filter.limit);
//     return topFarmsteads;
//   } catch {
//     return thunkApi.rejectWithValue('Server error');
//   }
// });


// const farmsteadsSlice = createSlice({
//     name: 'farmsteads',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getTopFarmsteads.pending, (state) => {
//             state.loading = true;
//             state.error = undefined;
//             state.topFarmsteads = [];
//         });
//         builder.addCase(getTopFarmsteads.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
//         builder.addCase(getTopFarmsteads.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.topFarmsteads = payload;
//         });
//     },
// });

// export const farmsteadsActions = {
//     ...farmsteadsSlice.actions,
//     getTopFarmsteads,
//   };

// const farmsteadsReducer = farmsteadsSlice.reducer;
// export default farmsteadsReducer;

export function empty() {

  return 0;
}