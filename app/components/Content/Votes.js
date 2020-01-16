import React from 'react'
import PropTypes from 'prop-types'

const Votes = ({ data }) => {
  if (data)
    return <div>hola, mundo!</div>
}

Votes.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Votes
