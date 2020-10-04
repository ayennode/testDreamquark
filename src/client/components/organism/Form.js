import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form as FinalForm } from 'react-final-form'
import { SecondaryButton, SubmitButton } from '../atom'

const StyledForm = styled.form`
  button[type='submit'] {
    display: inline-block;
    width: 254px;
  }
`

/*
@TODO add a withCancel button
 */

export const Form = ({
  submitFunction,
  submitLabel,
  initialValues,
  withCancel,
  withCancelLabel,
  resetFunction = () => {},
  children,
  validate,
}) => {
  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={submitFunction}
      validate={validate}
      render={({ handleSubmit, form: { reset, getFieldState }, invalid }) => (
        <StyledForm onSubmit={handleSubmit} method="post">
          {children}
          {withCancel && (
            <SecondaryButton
              onClick={() => {
                reset()
                resetFunction()
              }}
              type="button"
            >
              {withCancelLabel}
            </SecondaryButton>
          )}
          <SubmitButton disabled={invalid}>{submitLabel}</SubmitButton>
        </StyledForm>
      )}
    />
  )
}
Form.defaultProps = {
  submitLabel: 'Send',
  withCancelLabel: 'Cancel',
  alignButton: 'center',
}
Form.propTypes = {
  submitFunction: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  withCancel: PropTypes.bool,
  withCancelLabel: PropTypes.string,
}
