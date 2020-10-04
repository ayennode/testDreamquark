import React, { useEffect } from 'react'

import { H1, Form, Input, MailInput, SelectBox } from '../components'
import { useHistory, useParams } from 'react-router-dom'

import { useMutation, useQuery, gql } from '@apollo/client'

const GET_USER = gql`
  query getUserById($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      email
      job {
        _id
        name
      }
    }
  }
`
const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $job: ID
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      job: $job
    ) {
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

export const EditUser = () => {
  let { id } = useParams()
  let history = useHistory()

  const onCompleted = () => {
    history.push('/userList')
  }
  const onError = (err) => {
    //@TODO need to use the dispatch redux here
    console.error(err)
  }

  const { loading, error, data } = useQuery(GET_USER, { variables: { id } })
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: onCompleted,
    onError: onError,
  })

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

  const submitFunction = (values) => {
    console.log('values', values)
    if (typeof values.job === 'object') {
      const { job, ...rest } = values
      values = rest
    }
    console.log(values)

    updateUser({ variables: { ...values } })
  }

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.log('error', error)
    return <div>Error...</div>
  }

  const jobId = (data.user.job && data.user.job._id) || null

  return (
    <Form
      submitFunction={submitFunction}
      submitLabel={labelObject.submit}
      initialValues={data.user}
    >
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

      <JobSelect id={jobId} />
    </Form>
  )
}

const JOB_AVAILABLE = gql`
  query getJobAvailable($id: ID) {
    jobAvailable(_id: $id) {
      _id
      name
    }
  }
`
const isRequired = (value) => !value && 'champs obligatoire'

const JobSelect = ({ id }) => {
  const { loading, error, data } = useQuery(JOB_AVAILABLE, {
    variables: { id },
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.log('error', error)
    return <div>error</div>
  }

  return (
    <SelectBox
      name="job"
      validate={[isRequired]}
      initialValue={id}
      optionsList={data.jobAvailable.map(({ _id, name }) => {
        return { name: name, value: _id }
      })}
      required
    />
  )
}
