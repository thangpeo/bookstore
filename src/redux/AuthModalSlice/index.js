import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  type: 'login'
}

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true
      state.type = action.payload
    },
    hideModal: (state, action) => {
      state.open = false
      state.type = 'login'
    }
  }
});

export const { openModal, hideModal } = authModalSlice.actions

export default authModalSlice.reducer