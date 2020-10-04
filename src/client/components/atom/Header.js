import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledH1 = styled.h1`
  text-align: ${({ align }) => align};
  color: #2d2f3e;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.1px;
  font-family: inherit;
  font-size: 38px;
  line-height: 1.2;
`

export const H1 = ({ children }) => <StyledH1>{children}</StyledH1>

H1.defaultProps = {
  align: 'center',
}
H1.propTypes = {
  align: PropTypes.string,
}
