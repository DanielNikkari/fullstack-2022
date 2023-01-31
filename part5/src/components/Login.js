
export const Login = ({ handleLogin, username, password, setPassword, setUsername}) => {
  return(
  <form onSubmit={handleLogin}>
    <h2>Log in</h2>
    <div>
      username
      <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
      password
      <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button type='submit'>Login</button>
  </form>
  )
}