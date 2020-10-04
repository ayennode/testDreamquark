import { useQuery, useMutation, gql } from '@apollo/client'
import { useEffect } from 'react'
import { LIST_USER } from '../pages/userList'

export const fetchUsers = () => {
  return (dispatch) => {
    console.log('inside dispatch')
    const { loading, error, data } = useQuery(LIST_USER)
    useEffect(() => {
      if (loading) {
        dispatch({ type: 'FETCH_IN_PROGRESS' })
        return
      } else {
        dispatch({ type: 'FETCH_DONE' })
      }
    }, [loading])
    if (!data) return
    const { users } = data
    dispatch(getUsers(users))
  }
}

export const getUsers = (users) => ({
  type: 'LIST_USERS',
  users,
})
