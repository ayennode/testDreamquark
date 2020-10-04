import React from 'react'
import PropTypes from 'prop-types'

import { Icon, InlineIcon } from '@iconify/react'
import trashBin from '@iconify/icons-ion/trash-bin'
import pencilIcon from '@iconify/icons-ion/pencil'

export const UpdateIcon = ({ color, height, ...rest }) => (
  <Icon icon={pencilIcon} color={color} height={height} {...rest} />
)

UpdateIcon.defaultProps = {
  color: '#124fff',
  height: 24,
}
UpdateIcon.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
}

export const DeleteIcon = ({ color, height, ...rest }) => (
  <Icon icon={trashBin} color={color} height={height} {...rest} />
)

DeleteIcon.defaultProps = {
  color: '#124fff',
  height: 24,
}
DeleteIcon.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
}
