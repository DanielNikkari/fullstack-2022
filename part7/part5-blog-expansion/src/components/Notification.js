import '../styling/notification.css'
import { useSelector } from 'react-redux'

export const Notification = ({ error }) => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div className={notification.error ? 'error' : 'info'}>
      <h2>{notification.message}</h2>
    </div>
  )
}
