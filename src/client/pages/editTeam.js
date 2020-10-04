import React from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { useMutation, useQuery, gql } from '@apollo/client'
import { render } from 'react-dom'
import { ManageTeam } from './manageTeam'

const GET_TEAM = gql`
  query getTeamById($id: ID!) {
    team(_id: $id) {
      _id
      name
      squadLeader {
        _id
        firstName
        lastName
      }
      squadMember1 {
        _id
      }
      squadMember2 {
        _id
      }
      intern {
        _id
      }
    }
  }
`

export const EditTeam = () => {
  let { id } = useParams()

  const { loading, error, data } = useQuery(GET_TEAM, { variables: { id } })

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return <ManageTeam team={data.team} />
}
