import React from 'react'
import { H1, Form, Input } from '../components'
import { useHistory } from 'react-router-dom'

import { useMutation, gql } from '@apollo/client'
import { LIST_JOB } from './jobList'

const ADD_JOB = gql`
  mutation($name: String!, $weight: Int!) {
    addJob(name: $name, weight: $weight) {
      _id
      name
      weight
    }
  }
`

export const ManageJob = () => {
  const labelObject = {
    placeholderName: 'nom',
    labelName: 'Nom de la fonction',
    placeholderWeight: '',
    labelWeight: 'hierarchie',
    submit: 'Envoyer',
    cancel: 'Annuler',
  }

  const updateCache = (cache, { data }) => {
    try {
      const old = cache.readQuery({
        query: LIST_JOB,
      })
      cache.writeQuery({
        query: LIST_JOB,
        data: {
          jobs: [...old.jobs, data.addJob],
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const onCompleted = () => {
    history.push('/jobList')
  }
  const onError = (err) => {
    //@TODO need to use the dispatch redux here
    console.error(err)
  }

  const [addJob] = useMutation(ADD_JOB, {
    update: updateCache,
    onCompleted: onCompleted,
    onError: onError,
  })
  let history = useHistory()

  const submitFunction = ({ name, weight }) => {
    addJob({ variables: { name: name, weight: parseInt(weight) } })
  }

  return (
    <>
      <H1>Creation d'un job</H1>

      <Form submitFunction={submitFunction} submitLabel={labelObject.submit}>
        <Input
          name="name"
          placeholder={labelObject.placeholderName}
          label={labelObject.labelName}
          required
        />
        <Input
          name="weight"
          placeholder={labelObject.placeholderWeight}
          label={labelObject.labelWeight}
          required
        />
      </Form>
    </>
  )
}
