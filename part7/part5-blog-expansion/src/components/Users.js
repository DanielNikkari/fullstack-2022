import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'

export const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h2>User</h2>
            </TableCell>
            <TableCell>
              <h2>Blogs created</h2>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>
                  <h3>{user.username}</h3>
                </Link>
              </TableCell>
              <TableCell>
                <h3>{user.blogs.length}</h3>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
