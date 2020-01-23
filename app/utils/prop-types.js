import PropTypes from 'prop-types'

export const widget = PropTypes.exact({
  cId: PropTypes.string,
  // Markdown data will be string for now
  // TODO: Embed md data into object
  data: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]).isRequired,
  layout: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
})
