import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getUsers()
      dispatch(setUsers(users))
    } catch (e) {
      console.log(e)
    }
  }
}

export default usersSlice.reducer
