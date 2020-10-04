import React from 'react'
import { H1, Button, RowGroup, Card } from '../components'
import { Link, useHistory } from 'react-router-dom'

import { useMutation, useQuery, gql } from '@apollo/client'

export const LIST_TEAM = gql`
  query getTeamList {
    teams {
      _id
      name
      squadLeader {
        _id
        firstName
        lastName
        job {
          name
        }
      }
      squadMember1 {
        _id
        firstName
        lastName
        job {
          name
        }
      }
      squadMember2 {
        _id
        firstName
        lastName
        job {
          name
        }
      }
      intern {
        _id
        firstName
        lastName
        job {
          name
        }
      }
      brokenTeam
    }
  }
`
const REMOVE_TEAM = gql`
  mutation removeTeam($_id: ID!) {
    deleteTeam(_id: $_id) {
      _id
    }
  }
`

export const TeamList = () => {
  let history = useHistory()
  const { loading, error, data } = useQuery(LIST_TEAM, {
    fetchPolicy: 'network-only',
  })
  const [removeTeam] = useMutation(REMOVE_TEAM)

  const deleteFunction = (id) => {
    console.log('removing', id)
    removeTeam({
      variables: { _id: id },
      update: (cache) => {
        const old = cache.readQuery({ query: LIST_TEAM })
        cache.writeQuery({
          query: LIST_TEAM,
          data: { teams: old.teams.filter((t) => t._id !== id) },
        })
      },
    })
  }

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
    <>
      <H1>Liste des équipes</H1>

      <RowGroup
        data={data.teams.map(
          (
            {
              _id,
              name,
              squadLeader,
              squadMember1,
              squadMember2,
              intern,
              brokenTeam,
            },
            i
          ) => (
            <Card
              name={name}
              color={brokenTeam ? 'salmon' : '#124fff'}
              updateFunction={() => history.push(`/manageTeam/${_id}`)}
              deleteFunction={() => deleteFunction(_id)}
            >
              {squadLeader && (
                <p style={brokenTeam ? { color: 'salmon' } : null}>
                  {squadLeader.lastName} {squadLeader.firstName} -{' '}
                  {squadLeader.job.name}
                </p>
              )}

              {squadMember1 && (
                <p>
                  {squadMember1.lastName} {squadMember1.firstName} -{' '}
                  {squadMember1.job.name}
                </p>
              )}
              {squadMember2 && (
                <p>
                  {squadMember2.lastName} {squadMember2.firstName} -{' '}
                  {squadMember2.job.name}
                </p>
              )}
              {intern && (
                <p>
                  {intern.lastName} {intern.firstName} - {intern.job.name}
                </p>
              )}
            </Card>
          )
        )}
        nbCol="3"
      />

      <Link to="/manageTeam">
        <Button>Créer une équipe</Button>
      </Link>
    </>
  )
}
