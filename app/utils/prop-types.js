import PropTypes from 'prop-types'

export const entry = PropTypes.shape({
  addr: PropTypes.string.isRequired,
  deleted: PropTypes.bool,
})
