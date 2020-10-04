import React from 'react'
import { H1, Table, Th, Td, Button } from '../components'
import { Link } from 'react-router-dom'

import { useMutation, useQuery, gql } from '@apollo/client'

export const LIST_JOB = gql`
  query getJobList {
    jobs {
      _id
      name
      weight
    }
  }
`

const JobListQuery = () => {
  const { loading, error, data } = useQuery(LIST_JOB)

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
    <Table>
      <tr>
        <Th>nom</Th>
        <Th>hierarchie</Th>
      </tr>

      {data.jobs.map(({ name, weight }, i) => {
        return (
          <tr key={i}>
            <Td>{name}</Td>
            <Td>{weight}</Td>
          </tr>
        )
      })}
    </Table>
  )
}

export const JobList = () => (
  <>
    <H1>Liste des fonctions</H1>

    <JobListQuery />

    <Link to="/manageJob">
      <Button>Creer une fonction</Button>
    </Link>
  </>
)
