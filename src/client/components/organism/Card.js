import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { DeleteIcon, UpdateIcon } from '../../components'

const StyledCard = styled.div`
  position: relative;
  border: 2px solid ${({ color }) => color};
  border-radius: 5px;
  padding: 20px;

  && {
    margin-bottom: 30px;
  }

  h2 {
    margin: 0;
    padding-bottom: 10px;
    border-bottom: 4px solid ${({ color }) => color};
  }
  svg {
    cursor: pointer;
  }
`
const StyledDelete = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
`

export const Card = ({
  name,
  color,
  deleteFunction,
  updateFunction,
  children,
}) => (
  <StyledCard color={color}>
    <StyledDelete>
      <DeleteIcon color={color} onClick={deleteFunction} />
    </StyledDelete>

    <h2>
      <UpdateIcon color={color} onClick={updateFunction} />
      {name}
    </h2>
    {children}
  </StyledCard>
)

Card.defaultProps = {
  color: 'salmon',
}

Card.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
}
