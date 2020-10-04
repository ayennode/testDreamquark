import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  color: #757575;

  && {
    margin-bottom: 30px;
  }

  & td:first-child {
    padding: 14px;
    text-align: left;
  }

  & tr {
    border-bottom: 1px solid #757575;
  }
`

export const Table = ({ children, ...rest }) => (
  <StyledTable {...rest}>
    <tbody>{children}</tbody>
  </StyledTable>
)

const StyledTh = styled.th`
  color: #757575;
  text-align: center;
  padding: 14px 0;

  font-size: 12px;
  text-transform: uppercase;
  font-weight: normal;
  margin: 0 10px;

  &:first-child {
    text-align: left;
  }
`

export const Th = ({ children, ...rest }) => (
  <StyledTh {...rest}>{children}</StyledTh>
)

const StyledTd = styled.td`
  color: inherit;
  text-align: center;
  label {
    font-size: 12px;
    text-transform: uppercase;
    color: #2d2f3e;
  }
`

export const Td = ({ children, ...rest }) => (
  <StyledTd {...rest}>{children}</StyledTd>
)
