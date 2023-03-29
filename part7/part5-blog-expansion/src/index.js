import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import blogsReducer from './reducers/blogsReducer'
import detailsReducer from './reducers/detailsReducer'
import showDeleteReducer from './reducers/showDeleteReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    details: detailsReducer,
    showDelete: showDeleteReducer,
    notification: notificationReducer,
    login: loginReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
