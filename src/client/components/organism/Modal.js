import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StyleModalCheck = styled.input`
  display: none;
`

const StyledModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({ active }) => active && `z-index : -1;`}

  input:checked ~ label {
    visibility: visible;
    background-color: black;
    opacity: 0.7;
    transition: background-color 250ms linear;
  }

  input:checked ~ div {
    visibility: visible;
    z-index: 100;
  }
`

const StyledModalBackground = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  visibility: hidden;
  transition: background-color 250ms linear;
`
const StyledModalContent = styled.div`
  visibility: hidden;
  position: absolute;
  margin-top: -10%;
  margin-left: -25%;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  z-index: 20;
`

export const Modal = ({ active, children }) => {
  return (
    <StyledModalContainer active={!active}>
      <StyleModalCheck
        type="checkbox"
        id="modal"
        checked={active}
        onChange={() => {}}
      />
      <StyledModalBackground htmlFor="modal" />
      <StyledModalContent>{children}</StyledModalContent>
    </StyledModalContainer>
  )
}
