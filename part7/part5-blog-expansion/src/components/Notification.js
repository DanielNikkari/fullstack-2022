import '../styling/notification.css'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

export const Notification = ({ error }) => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div className={notification.error ? 'error' : 'info'}>
      {notification.error ? (
        <Alert severity="error">{notification.message}</Alert>
      ) : (
        <Alert severity="success">{notification.message}</Alert>
      )}
    </div>
  )
}
