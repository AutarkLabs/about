import PropTypes from 'prop-types'
import React from 'react'

import bold from './bold.svg'
import code from './code.svg'
import italic from './italic.svg'
import link from './link.svg'
import list from './list.svg'
import quote from './quote.svg'
import size from './size.svg'

// TODO: Convert to one simple component that accepts different icons
const iconPropTypes = { height: PropTypes.string, width: PropTypes.string }
const iconDefaultProps = { height: 'auto', width: 'auto' }

export const Bold = ({ height, width }) => (
  <img src={bold} alt="Bold" title="Bold" height={height} width={width} />
)
export const Code = ({ height, width }) => (
  <img src={code} alt="Code" title="Code" height={height} width={width} />
)
export const Italic = ({ height, width }) => (
  <img src={italic} alt="Italic" title="Italic" height={height} width={width} />
)
export const Link = ({ height, width }) => (
  <img
    src={link}
    alt="Insert link"
    title="Insert link"
    height={height}
    width={width}
  />
)
export const List = ({ height, width }) => (
  <img
    src={list}
    alt="Unordered list"
    title="Unordered list"
    height={height}
    width={width}
  />
)
export const Quote = ({ height, width }) => (
  <img src={quote} alt="Quote" title="Quote" height={height} width={width} />
)
export const TextSize = ({ height, width }) => (
  <img
    src={size}
    alt="Cycle headers"
    title="Cycle headers"
    height={height}
    width={width}
  />
)

Bold.propTypes = iconPropTypes
Code.propTypes = iconPropTypes
Italic.propTypes = iconPropTypes
Link.propTypes = iconPropTypes
List.propTypes = iconPropTypes
Quote.propTypes = iconPropTypes
TextSize.propTypes = iconPropTypes

Bold.defaultProps = iconDefaultProps
Code.defaultProps = iconDefaultProps
Italic.defaultProps = iconDefaultProps
Link.defaultProps = iconDefaultProps
List.defaultProps = iconDefaultProps
Quote.defaultProps = iconDefaultProps
TextSize.defaultProps = iconDefaultProps