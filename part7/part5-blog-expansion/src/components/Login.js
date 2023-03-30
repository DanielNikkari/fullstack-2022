import '../styling/App.css'

export const Login = ({ handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2 style={{ color: 'black' }}>Log in</h2>
      <div>
        username
        <input id="username-input" type="text" name="username" />
      </div>
      <div>
        password
        <input id="password-input" type="password" name="password" />
      </div>
      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  )
}
