import { createSlice } from '@reduxjs/toolkit'

const showDeleteSlice = createSlice({
  name: 'showDelete',
  initialState: {},
  reducers: {
    showDelte(state, action) {
      const id = action.payload
      state[id] = true
    },
    hideDelete(state, action) {
      const id = action.payload
      state[id] = false
    }
  }
})

export const { showDelte, hideDelete } = showDeleteSlice.actions
export default showDeleteSlice.reducer
