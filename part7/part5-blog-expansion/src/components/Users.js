import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              <h4>user</h4>
            </th>
            <th>
              <h4>blogs created</h4>
            </th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
