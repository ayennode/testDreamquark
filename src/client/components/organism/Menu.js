import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLink } from '../../components'

const StyledMenu = styled.div`
  height: auto;
  width: 100%;
  min-height: inherit;
  flex: 0 0 234px;
  max-width: 234px;
  color: #c0c1c5;
  background-color: #2d2f3d;
`

export const Menu = ({ items }) => (
  <StyledMenu>
    <ListLink items={items} />
  </StyledMenu>
)

Menu.propTypes = {
  items: PropTypes.array.isRequired,
}
