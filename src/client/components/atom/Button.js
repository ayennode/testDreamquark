import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  padding: 12px 24px;
  min-width: 130px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  border: 3px solid transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: all 0.15s ease;
  ${({ large }) => large && `width : 303px;`}

  &:hover {
    transition: all 0.15s ease;
  }

  display: inline-block;
  text-decoration: none;
  text-align: center;
`

const StyledColorButton = styled(StyledButton)`
  color: #ffffff;
  border-color: #124fff;
  background-color: #124fff;

  &:disabled {
    border-color: #72767e;
    background-color: #72767e;
    cursor: not-allowed;
  }
`

export const Button = ({ children, onClick, ...props }) => (
  <StyledColorButton {...props} onClick={onClick}>
    {children}
  </StyledColorButton>
)

const onClickDefault = () => {}

Button.defaultProps = {
  type: 'button',
  onClick: onClickDefault,
}
Button.propTypes = {
  type: PropTypes.string,
  large: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

const StyledSecondaryButton = styled(StyledButton)``

export const SecondaryButton = ({ onClick, children, ...props }) => (
  <StyledSecondaryButton {...props} onClick={onClick}>
    {children}
  </StyledSecondaryButton>
)
SecondaryButton.defaultProps = {
  type: 'button',
}
SecondaryButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export const SubmitButton = ({ children, ...props }) => (
  <StyledColorButton {...props}>{children}</StyledColorButton>
)
SubmitButton.defaultProps = {
  type: 'submit',
}
SubmitButton.propTypes = {
  type: PropTypes.string,
}

const StyledArrowButton = styled.a`
  padding-top: 10px;
  padding-left: 15px;
  position: relative;
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  //border: 1px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  //${({ direction }) => rotateImage(direction)}

  &:before {
    content: '';
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`

export const ArrowButton = ({ children, direction, onClick, ...rest }) => (
  <StyledArrowButton direction={direction} onClick={onClick}>
    {/*displayPicture('arrow-left')*/} V {children}
  </StyledArrowButton>
)
ArrowButton.defaultProps = {
  type: 'button',
}
ArrowButton.propTypes = {
  type: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}
