import React from 'react'
import { H1, Form, Input, MailInput } from '../components'
import { useHistory } from 'react-router-dom'

import { useMutation, gql } from '@apollo/client'
import { LIST_USER } from './userList'

const ADD_USER = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`

export const ManageUser = () => {
  const labelObject = {
    placeholderFirstName: 'prenom',
    labelFirstName: 'Prenom',
    placeholderLastName: 'nom',
    labelLastName: 'nom',
    placeholderEmail: 'email',
    labelEmail: 'email',
    submit: 'Envoyer',
    cancel: 'Annuler',
  }

  const updateCache = (cache, { data }) => {
    const usersOld = cache.readQuery({ query: LIST_USER })
    if (usersOld) {
      cache.writeQuery({
        query: LIST_USER,
        data: { users: [...usersOld.users, data.addUser] },
      })
    }
  }

  const onCompleted = () => {
    history.push('/userList')
  }
  const onError = (err) => {
    //@TODO need to use the dispatch redux here
    console.error(err)
  }

  const [addUser] = useMutation(ADD_USER, {
    update: updateCache,
    onCompleted: onCompleted,
    onError: onError,
  })
  let history = useHistory()

  const submitFunction = (values) => {
    addUser({
      variables: { ...values },
    })
  }

  return (
    <>
      <H1>Creation d'un utilisateur</H1>

      <Form submitFunction={submitFunction} submitLabel={labelObject.submit}>
        <Input
          name="firstName"
          placeholder={labelObject.placeholderFirstName}
          label={labelObject.labelFirstName}
          required
        />
        <Input
          name="lastName"
          placeholder={labelObject.placeholderLastName}
          label={labelObject.labelLastName}
          required
        />
        <MailInput
          name="email"
          placeholder={labelObject.placeholderEmail}
          label={labelObject.labelEmail}
        />
      </Form>
    </>
  )
}
