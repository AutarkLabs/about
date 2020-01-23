import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@aragon/ui'

const Votes = ({ data }) => {
  return (
    <>
      {data.votes.map(vote => (
        <Card key={vote.id}>
          {vote.id}
        </Card>
      ))}
    </>
  )
}

Votes.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Votes
