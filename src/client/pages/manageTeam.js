import React from 'react'
import { H1, Form, Input, SelectBox } from '../components'
import { useHistory, useParams } from 'react-router-dom'

import { useMutation, useQuery, gql } from '@apollo/client'
import { LIST_TEAM } from './teamList'
import data from '@iconify/icons-ion/trash-bin'

const GET_AVAILABLE_LEADER = gql`
  query getLeader {
    leaders {
      _id
      firstName
      lastName
    }
  }
`

const LIST_USER_WITHOUT_LEADER = gql`
  query getUserList {
    usersWithoutLeader {
      _id
      firstName
      lastName
      job {
        _id
        name
      }
    }
  }
`

const ADD_TEAM = gql`
  mutation(
    $name: String!
    $squadLeader: ID!
    $squadMember1: ID
    $squadMember2: ID
    $intern: ID
  ) {
    addTeam(
      name: $name
      squadLeader: $squadLeader
      squadMember1: $squadMember1
      squadMember2: $squadMember2
      intern: $intern
    ) {
      _id
      name
      squadLeader {
        firstName
        lastName
      }
      squadMember1 {
        firstName
        lastName
      }
      squadMember2 {
        firstName
        lastName
      }
      intern {
        firstName
        lastName
      }
    }
  }
`
const EDIT_TEAM = gql`
  mutation(
    $_id: ID!
    $name: String
    $squadLeader: ID
    $squadMember1: ID
    $squadMember2: ID
    $intern: ID
  ) {
    updateTeam(
      _id: $_id
      name: $name
      squadLeader: $squadLeader
      squadMember1: $squadMember1
      squadMember2: $squadMember2
      intern: $intern
    ) {
      _id
      name
      squadLeader {
        firstName
        lastName
      }
      squadMember1 {
        firstName
        lastName
      }
      squadMember2 {
        firstName
        lastName
      }
      intern {
        firstName
        lastName
      }
    }
  }
`

//@TODO faire un helper pour ça ?
const isRequired = (value) => !value && 'champs obligatoire'
//@TODO helper à ranger
const cleanValue = (cleaner) =>
  Object.keys(cleaner).reduce((obj, key) => {
    obj[key] = cleaner[key]
    if (typeof cleaner[key] === 'object' && !!cleaner[key]) {
      obj[key] = cleaner[key]._id
    }
    return obj
  }, {})

export const ManageTeam = ({ team = [] }) => {
  let history = useHistory()

  const updateCache = (cache, { data }) => {
    try {
      const old = cache.readQuery({
        query: LIST_TEAM,
      })
      cache.writeQuery({
        query: LIST_TEAM,
        data: {
          teams: [...old.teams, data.addTeam],
        },
      })
    } catch (e) {}
  }

  const onCompleted = () => {
    history.push('/teamList')
  }
  const onError = (err) => {
    //@TODO need to use the dispatch redux here
    console.error(err)
  }

  const [addTeam] = useMutation(ADD_TEAM, {
    update: updateCache,
    onCompleted: onCompleted,
    onError: onError,
  })

  const [updateTeam] = useMutation(EDIT_TEAM, {
    onCompleted: onCompleted,
    onError: onError,
  })

  const submitFunction = (values) => {
    if (!!values._id) {
      return updateTeam({
        variables: { ...cleanValue(values) },
      })
    }
    addTeam({
      variables: { ...values },
    })
  }

  const labelObject = {
    placeholderName: 'name',
    labelName: 'nom',
    submit: 'Envoyer',
  }

  const validateForm = (values) => {
    const errors = {}
    if (!values.squadLeader) {
      errors.squadLeader = 'il faut un squadLeader pour créer une équipe'
    }
    if (values.squadMember1 && values.squadMember1 === values.squadMember2) {
      errors.squadMember1 = 'les membres doivent être différent'
    }

    return errors
  }

  return (
    <>
      <H1>création d'une équipe</H1>

      <Form
        submitFunction={submitFunction}
        submitLabel={labelObject.submit}
        validate={validateForm}
        initialValues={cleanValue(team)}
      >
        <Input
          name="name"
          placeholder={labelObject.placeholderName}
          label={labelObject.labelName}
          required
        />

        <SquadLeaderSelect team={team} />

        <OtherMember team={team} />
      </Form>
    </>
  )
}

const SquadLeaderSelect = ({ team }) => {
  const { loading, error, data } = useQuery(GET_AVAILABLE_LEADER, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.log('error', error)
    return <div>error</div>
  }

  if (!data.leaders || data.leaders.length == 0) {
    return <p>il n'y a pas de chef d'équipe disponibe</p>
  }

  let options = data.leaders.map(({ _id, firstName, lastName }) => {
    return { name: `${lastName} ${firstName}`, value: _id }
  })
  if (team && team.squadLeader && team.squadLeader._id) {
    options = [
      {
        name: `${team.squadLeader.lastName} ${team.squadLeader.firstName}`,
        value: team.squadLeader._id,
      },
      ...options,
    ]
  }

  return (
    <SelectBox
      name="squadLeader"
      validate={[isRequired]}
      initialValue={team && team.squadLeader && team.squadLeader._id}
      optionsList={options}
      required
    />
  )
}

const OtherMember = ({ team }) => {
  const { loading, error, data } = useQuery(LIST_USER_WITHOUT_LEADER)

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.log('error', error)
    return <div>error</div>
  }

  return (
    <>
      <SelectBox
        name="squadMember1"
        initialValue={team && team.squadMember1 && team.squadMember1._id}
        optionsList={data.usersWithoutLeader
          .filter((f) => f.job && f.job.name === 'squad member')
          .map(({ _id, firstName, lastName, job }) => {
            return {
              name: `${lastName} ${firstName} - ${job.name}`,
              value: _id,
            }
          })}
        required
      />
      <SelectBox
        name="squadMember2"
        initialValue={team && team.squadMember2 && team.squadMember2._id}
        optionsList={data.usersWithoutLeader
          .filter((f) => f.job && f.job.name === 'squad member')
          .map(({ _id, firstName, lastName, job }) => {
            return {
              name: `${lastName} ${firstName} - ${job.name}`,
              value: _id,
            }
          })}
        required
      />

      <SelectBox
        name="intern"
        initialValue={team && team.intern && team.intern._id}
        optionsList={data.usersWithoutLeader
          .filter((f) => !f.job || f.job.name == 'intern')
          .map(({ _id, firstName, lastName, job }) => {
            return {
              name: `${lastName} ${firstName} - ${job && job.name}`,
              value: _id,
            }
          })}
        required
      />
    </>
  )
}
