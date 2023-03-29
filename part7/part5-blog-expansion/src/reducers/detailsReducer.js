import { createSlice } from '@reduxjs/toolkit'

const detailsSlice = createSlice({
  name: 'details',
  initialState: {},
  reducers: {
    toggleDetails(state, action) {
      const id = action.payload
      state[id] = !state[id]
    }
  }
})

export const { toggleDetails } = detailsSlice.actions
export default detailsSlice.reducer
