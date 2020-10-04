import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  margin-top: 32px;
`

const Styledlink = styled.li`
  position: relative;
  font-size: 16px;
  border-bottom: 1px solid #3a3d52;
  transition: all 0.15s ease;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: 0;
    width: 5px;
    z-index: 1;
  }

  & a {
  padding: 12px 24px;
  display: block;
  color: inherit;
  text-decoration: none;

  &: hover {
  transition: all 0.15s ease;
  color: #ffffff;
`

export const ListLink = ({ items }) => {
  return (
    items.length > 0 && (
      <StyledList>
        {items.map((item, i) => (
          <Styledlink key={i}>{item}</Styledlink>
        ))}
      </StyledList>
    )
  )
}

ListLink.propTypes = {
  items: PropTypes.array.isRequired,
}
