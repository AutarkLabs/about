import PropTypes from 'prop-types'

export const widget = PropTypes.shape({
  type: PropTypes.symbol.isRequired,
  data: PropTypes.object.isRequired,
})
