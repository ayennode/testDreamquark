import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import {
  H1,
  Table,
  Th,
  Td,
  Button,
  UpdateIcon,
  DeleteIcon,
} from '../components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useQuery, useMutation, gql } from '@apollo/client'
import { fetchUsers } from '../actions'

export const LIST_USER = gql`
  query getUserList {
    users {
      _id
      firstName
      lastName
      email
      job {
        name
      }
    }
  }
`
const REMOVE_USER = gql`
  mutation removeUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`

const UserListQuery = () => {
  /*
    Je laisse ici à titre d'exemple, sachant que cela ne sert à rien et au contraire, rajoute plus de rerender inutile.
    Apollo et son cache fais déjà le job de garder le state à jour
    Je pourrais remplacé la requete faite par apollo par une requete ajax et garder la main complétement sur le state,
    il faudrait alors mettre à jour les function d'update/delete également. 
    * J'ai pu voir que ce serait probablement la meilleur solution pour la partie Team car l'update en cascade me force à annuler 
    le cache d'appollo sous peine d'avoir des infos fausses.
  */
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  dispatch(fetchUsers())

  const [removeUser] = useMutation(REMOVE_USER)

  const deleteFunction = (id) => {
    console.log('removing', id)
    removeUser({
      variables: { _id: id },
      update: (cache) => {
        const usersOld = cache.readQuery({
          query: LIST_USER,
        })
        cache.writeQuery({
          query: LIST_USER,
          data: {
            users: usersOld.users.filter((t) => t._id !== id),
          },
        })
      },
    })
  }

  return (
    <Table>
      <tr>
        <Th></Th>
        <Th>nom</Th>
        <Th>prenom</Th>
        <Th>email</Th>
        <Th>job</Th>
        <Th></Th>
      </tr>

      {users.map(({ lastName, firstName, email, job, _id }) => {
        return (
          <tr key={_id}>
            <Td>
              <Link to={`/manageUser/${_id}`}>
                <UpdateIcon />
              </Link>
            </Td>
            <Td>{lastName}</Td>
            <Td>{firstName}</Td>
            <Td>{email}</Td>
            <Td>{job && job.name}</Td>
            <Td>
              <DeleteIcon onClick={() => deleteFunction(_id)} />
            </Td>
          </tr>
        )
      })}
    </Table>
  )
}

export const UserList = () => (
  <>
    <Helmet>
      <title>UserList</title>
    </Helmet>
    <H1>Liste des utilisateurs</H1>

    <UserListQuery />

    <Link to="/manageUser">
      <Button>creer un utilisateur</Button>
    </Link>
  </>
)
