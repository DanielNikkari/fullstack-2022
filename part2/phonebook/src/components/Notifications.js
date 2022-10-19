export const Notification = ({ message, error }) => {
  if (message === null) {
    return
  }

  return <div className={error ? "error" : "notification"}>{message}</div>
}
