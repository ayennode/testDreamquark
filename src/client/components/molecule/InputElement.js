import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { DefaultInput, InputLabel, ErrorLabel, DisableInput } from '../atom'
import { Dropdown } from '../molecule'

/*@todo remove the validator from here */
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value) => !value && 'validator.required'

const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isEmail = (value) =>
  !emailRx.test(String(value).toLowerCase()) && 'validator.email'

const StyledInputGroup = styled.div`
  margin: 15px 0;
  text-align: left;
  display: flex;
  flex-direction: column-reverse;
`

const WithoutFieldInput = ({
  id,
  name,
  label,
  required,
  meta,
  intl,
  ...rest
}) => (
  <StyledInputGroup>
    <ErrorLabel meta={meta} intl={intl} />
    <DefaultInput id={id} name={name} required={required} {...rest} />
    <InputLabel htmlFor={id} required={required}>
      {label}
    </InputLabel>
  </StyledInputGroup>
)

export const Input = ({
  name,
  id = name,
  label = name,
  placeholder,
  required,
  parse,
  initialValue,
  validate = [],
  ...rest
}) => (
  <Field
    name={name}
    validate={composeValidators(...validate)}
    parse={parse}
    initialValue={initialValue}
    render={({ input, meta }) => (
      <WithoutFieldInput
        placeholder={placeholder}
        required={required}
        id={id}
        name={name}
        label={label}
        meta={meta}
        {...input}
        {...rest}
      />
    )}
  />
)

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  placeholder: PropTypes.string,
}

export const MailInput = ({
  name,
  id = name,
  label = name,
  placeholder,
  required,
  parse,
  initialValue,
  validate = [],
  ...rest
}) => (
  <Field
    name={name}
    validate={composeValidators(isEmail, ...validate)}
    parse={parse}
    initialValue={initialValue}
    render={({ input, meta }) => (
      <WithoutFieldInput
        placeholder={placeholder}
        type="email"
        id={id}
        name={name}
        label={label}
        required="required"
        meta={meta}
        {...input}
        {...rest}
      />
    )}
  />
)
MailInput.defaultProps = {
  placeholder: 'E-mail here...',
}

MailInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.array,
}

export const SelectBox = ({
  name,
  id = name,
  label = name,
  required,
  intl,
  optionsList,
  initialValue,
  defaultLabel,
  validate = [],
}) => {
  return (
    <Field
      name={name}
      options={optionsList}
      validate={composeValidators(...validate)}
      render={({ input, meta, options }) => {
        return (
          <StyledInputGroup>
            <ErrorLabel meta={meta} intl={intl} />
            <Dropdown
              name={input.name}
              options={options}
              initialValue={initialValue}
              defaultLabel={defaultLabel}
              onChange={(value) => input.onChange(value)}
            />
            <InputLabel htmlFor={id} required={required}>
              {label}
            </InputLabel>
          </StyledInputGroup>
        )
      }}
    />
  )
}
SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  optionsList: PropTypes.array.isRequired,
}
