import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    }
  }
})

export const { setUser, logout } = loginSlice.actions

export const login = (userInfo) => {
  return async (dispatch) => {
    try {
      const user = await loginService.sendCredentials(userInfo)
      blogService.setToken(user.token)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(displayNotification(`Logged in as ${userInfo.username}`, false))
    } catch (e) {
      dispatch(displayNotification('Wrong credentials', true))
    }
  }
}

export default loginSlice.reducer
