import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const displayNotification = (message, error) => {
  return async (dispatch) => {
    dispatch(setMessage({ message, error }))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export default notificationSlice.reducer
