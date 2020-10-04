import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ArrowButton } from '../atom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
const ListDiv = styled.div`
  border-top: 1px solid #757575;
  border-left: 1px solid #757575;
  border-right: 1px solid #757575;
  border-radius: 5px;
  z-index: 99;
  position: absolute;
  width: 98%;
  top: 50px;
  background-color: #ffffff;
`

const Label = styled.div`
  height: 54px;
  border: 1px solid #757575;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #757575;
`

const StyledUl = styled.ul`
  list-style-type: none;
  padding-inline-start: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-block-start: 0em;
  margin-block-end: 0em;
`
const StyledLi = styled.li`
  color: #757575;
  height: 54px;
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #757575;
`

export const Dropdown = ({
  labelContent,
  options,
  onChange,
  defaultLabel = 'Select a value',
  initialValue,
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState(
    initialValue
      ? options.find((o) => o.value === initialValue).name
      : defaultLabel
  )

  const ref = useRef(null)
  const refContainer = useRef(null)

  const onWindowClick = useCallback(
    (e) => {
      const toggle = ref && ref.current && ref.current.contains(e.target)
      const content =
        refContainer &&
        refContainer.current &&
        refContainer.current.contains(e.target)

      if (!toggle && !content && visible === true) {
        setVisible(false)
      }
    },
    [visible]
  )

  useEffect(() => {
    window.addEventListener('click', onWindowClick)
    return () => window.removeEventListener('click', onWindowClick)
  })

  const handleSelectValue = (e, name, value) => {
    e.preventDefault()
    setSelectedValue(name)
    setVisible(false)
    onChange(value)
  }

  const list = options.map(({ name, value }, key) => (
    <StyledLi
      onClick={(e) => handleSelectValue(e, name, value)}
      key={key}
      value={value}
    >
      {name}
    </StyledLi>
  ))

  const toggeElement = labelContent ? (
    React.createElement(
      labelContent,
      {
        ...labelContent.props,
        value: selectedValue,
      },
      <ArrowButton
        direction={visible ? 'top' : 'bottom'}
        onClick={(e) => setVisible(!visible)}
      />
    )
  ) : (
    <>
      {selectedValue}{' '}
      <ArrowButton
        direction={visible ? 'top' : 'bottom'}
        onClick={(e) => setVisible(!visible)}
      />
    </>
  )

  return (
    <Container>
      <Label ref={ref}>{toggeElement}</Label>
      {visible && (
        <ListDiv ref={refContainer}>
          <StyledUl>{list}</StyledUl>
        </ListDiv>
      )}
    </Container>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  LabelContent: PropTypes.object,
  defaultLabel: PropTypes.string,
}
