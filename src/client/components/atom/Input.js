import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

/** /!\ atom and molecule don't have exactly the same property */

const StyledInputLabel = styled.label`
  display: block;
  text-transform: uppercase;
  width: 100%;
  font-weight: normal;
  font-style: normal;
  font-size: 0.733em;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #757575;
  user-select: none;
  > span.opt {
    font-size: 10px;
    font-style: italic;
    text-transform: capitalize;
    color: #c0c1c5;
  }
`

export const InputLabel = ({ htmlFor, required, children, ...rest }) => {
  return (
    <StyledInputLabel htmlFor={htmlFor}>
      {children}
      {required ? '' : <span className="opt"> (Optionnel)</span>}
    </StyledInputLabel>
  )
}

InputLabel.defaultProps = {
  required: false,
}

InputLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

const StyledErrorLabel = styled.span`
  padding-top: 5px;
  font-size: 0.733em;
  font-weight: normal;
  font-style: italic;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ff5d6c;
  + input {
    border-bottom: 1px solid #ff5d6c;
  }
  + div {
    > input {
      border-bottom: 1px solid #ff5d6c;
      + button {
        border-bottom: 1px solid #ff5d6c;
      }
    }
  }
`
export const ErrorLabel = ({
  meta: { visited, touched, error },
  intl = { formatMessage: (val) => val.id },
  ...rest
}) => {
  /*
  console.log('error', error)
  console.log('visited', visited)
  console.log('touched', touched)
*/

  return visited && touched && error ? (
    <StyledErrorLabel {...rest}>
      {intl.formatMessage({ id: error })}
    </StyledErrorLabel>
  ) : null
}

ErrorLabel.defaultProps = {
  meta: { visited: false, touched: false, error: '' },
}

ErrorLabel.propTypes = {
  meta: PropTypes.object,
}

const StyledInput = styled.input`
  padding: 10px 0 15px 0;
  background: transparent;
  font-size: 1em;
  border: 0;
  width: 100%;
  outline: none;

  border-bottom: 1px solid #c0c1c5;
  transition: border-bottom-color 0.15s ease;

  &::placeholder {
    color: #757575;
    opacity: 1;
  }
  &:focus,
  &:active {
    color: #00000;
    border-bottom-color: #7357ff;
    transition: border-bottom-color 0.15s ease;

    + button {
      color: #00000;
      border-bottom-color: #00000;
    }
    + label {
      color: #333446;
      > span {
        color: #2d2f3e;
      }
    }
  }
`

export const DefaultInput = ({ id, name, children, ...rest }) => (
  <StyledInput id={id} name={name} {...rest}>
    {children}
  </StyledInput>
)
DefaultInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
}

const StyledDisabledInput = styled.div`
  text-align: left;
  width: 100%;
  p {
    margin: 0;
    padding: 11px 0;
    font-size: 16px;
    border: 0;
    width: 100%;
    outline: none;
    border-radius: 0;
    position: relative;
    background-color: transparent;
    color: #757575;
    border-bottom: 1px solid #c0c1c5;
    transition: border-bottom-color 0.15s ease;

    span {
      position: absolute;
      right: 10px;
      color: #7357ff;
      top: 0;
      a {
        color: inherit;
        text-decoration: none;
        top: 25%;
      }
    }
  }
`

export const DisableInput = ({ label, value, children, ...rest }) => (
  <StyledDisabledInput {...rest}>
    <InputLabel required>{label}</InputLabel>
    <p>
      {value} {children ? <span>{children}</span> : null}
    </p>
  </StyledDisabledInput>
)
DisableInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
