import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ small }) => (small ? '734px' : '1140px')};
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 1px;
`

export const Container = (props) => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
)

Container.defaultProps = {
  small: false,
}
Container.propTypes = {
  small: PropTypes.bool,
}

const StyledContent = styled.main`
  position: relative;
  flex: 1;
  background-color: #333446;
  color: #757575;
`

export const Content = (props) => (
  <StyledContent {...props}>{props.children}</StyledContent>
)

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  margin-left: -15px;
  margin-right: -15px;
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
`

// Classic 12-columns Grid
const COLUMNS = 12
const calcGrid = (size = COLUMNS) => {
  if (size === 'auto') {
    return css`
      flex: 0 0 auto;
      max-width: 100%;
    `
  }

  return css`
    flex: 0 0 ${(size / COLUMNS) * 100}%;
    max-width: ${(size / COLUMNS) * 100}%;
  `
}

const StyledCol = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  min-height: 1px;
  ${({ xs }) => calcGrid(xs)}

  @media(min-width: 768px) {
    ${({ sm }) => calcGrid(sm)}
  }
`

export const Row = (props) => <StyledRow {...props}>{props.children}</StyledRow>
Row.defaultProps = {
  reverse: false,
}
Row.propTypes = {
  justify: PropTypes.string,
  align: PropTypes.string,
  reverse: PropTypes.bool,
}

export const Col = (props) => <StyledCol {...props}>{props.children}</StyledCol>
Col.propTypes = {
  xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

const StyledBox = styled.div`
  margin: 64px 20px 200px;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 3px 2px 40px -21px;
  background-color: #ffffff;
`

export const Box = (props) => <StyledBox {...props}>{props.children}</StyledBox>

export const RowGroup = ({ data, nbCol }) => {
  return data
    .reduce(
      (acc, item, i) => {
        let group = acc.pop()
        if (group.length == nbCol) {
          acc.push(group)
          group = []
        }
        group.push(item)
        acc.push(group)
        return acc
      },
      [[]]
    )
    .map((item, i) => {
      return (
        <Row key={i}>
          {item.map((col, j) => {
            return (
              <Col sm={12 / nbCol} key={j}>
                {col}
              </Col>
            )
          })}
        </Row>
      )
    })
}
