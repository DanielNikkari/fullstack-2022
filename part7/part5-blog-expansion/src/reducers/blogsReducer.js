import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setBlogs } = blogsSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = (await blogService.getAll()).sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    try {
      await blogService.updateLikes(id, updatedBlog)
      const blogs = (await blogService.getAll()).sort(
        (a, b) => b.likes - a.likes
      )
      dispatch(setBlogs(blogs))
    } catch (e) {
      dispatch(
        displayNotification('Something went wrong, please try again', true)
      )
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      await blogService.createBlog(newBlog)
      await dispatch(initBlogs())
      dispatch(
        displayNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} created`,
          false
        )
      )
    } catch (e) {
      dispatch(
        displayNotification('Failed to create blog, please try again', true)
      )
    }
  }
}

export const deleteBlogAction = (blog) => {
  return async (dispatch) => {
    try {
      const title = blog.title
      await blogService.deleteBlog(blog.id)
      await dispatch(initBlogs())
      dispatch(
        displayNotification(`the blog ${title} was deleted successfully`, false)
      )
    } catch (e) {
      dispatch(
        displayNotification('Something went wrong, please try again', true)
      )
    }
  }
}

export default blogsSlice.reducer
