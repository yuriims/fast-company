import React, { useState } from 'react'
import api from '../api'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const renderPhrase = (number) => {
    const number1 =
      (number < 10) & (number > 20)
        ? number - Math.trunc(number / 10) * 10
        : number

    const lettersA_U = (number1 > 1) & (number1 < 5) ? ['a', 'у'] : ['', 'е']
    const classes = number1 === 0 ? 'danger' : 'primary'
    const phrase =
      number1 === 0
        ? 'Никто с тобой не тусанет ))'
        : `${number} человек${lettersA_U[0]} тусан${lettersA_U[1]}т с тобой сегодня`
    return <span className={`fs-6 badge bg-${classes}`}>{phrase}</span>
  }
  const userHead = () => {
    return (
      <thead>
        <tr>
          <th scope='col'>Имя</th>
          <th scope='col'>Качества</th>
          <th scope='col'>Профессия</th>
          <th scope='col'>Встретился, раз</th>
          <th scope='col'>Оценка</th>
          <th scope='col'> </th>
        </tr>
      </thead>
    )
  }

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((u) => u._id !== userId))
  }

  const renderTable = (noMeetings) => {
    if (noMeetings) return
    return (
      <table className='table'>
        {userHead()}
        <tbody>
          {users.map((oneUser) => (
            <tr key={oneUser._id}>
              <td>{oneUser.name}</td>
              <td>
                {oneUser.qualities.map((q) => (
                  <span key={q._id} className={`badge m-2 bg-${q.color}`}>
                    {q.name}
                  </span>
                ))}
              </td>
              <td>{oneUser.profession.name}</td>
              <td>{`${oneUser.rate}/5`}</td>

              <td>
                <button
                  className='btn btn-danger btn-sm m-2'
                  onClick={() => handleDelete(oneUser._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <>
      {renderPhrase(users.length)}

      {/* {QQ()} */}
      {renderTable(users.length === 0)}
    </>
  )
}
export default Users
