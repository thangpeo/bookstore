import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryApi from '../../api/categoryApi'

const initialState = {
  loading: false,
  data: [],
}

export const getCategories = createAsyncThunk("category/get", async () => {
  const response = await categoryApi.getAll()
  return response.data
})
const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.loading = true
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload

    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
});

export const { } = categorySlice.actions

export default categorySlice.reducer