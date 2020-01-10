import React from 'react'
import bold from './bold.svg'
import code from './code.svg'
import italic from './italic.svg'
import link from './link.svg'
import list from './list.svg'
import quote from './quote.svg'
import size from './size.svg'

export const Bold = ({ height = 'auto', width = 'auto' }) => (
  <img src={bold} alt="Bold" title="Bold" height={height} width={width} />
)
export const Code = ({ height = 'auto', width = 'auto' }) => (
  <img src={code} alt="Code" title="Code" height={height} width={width} />
)
export const Italic = ({ height = 'auto', width = 'auto' }) => (
  <img src={italic} alt="Italic" title="Italic" height={height} width={width} />
)
export const Link = ({ height = 'auto', width = 'auto' }) => (
  <img
    src={link}
    alt="Insert link"
    title="Insert link"
    height={height}
    width={width}
  />
)
export const List = ({ height = 'auto', width = 'auto' }) => (
  <img
    src={list}
    alt="Unordered list"
    title="Unordered list"
    height={height}
    width={width}
  />
)
export const Quote = ({ height = 'auto', width = 'auto' }) => (
  <img src={quote} alt="Quote" title="Quote" height={height} width={width} />
)
export const TextSize = ({ height = 'auto', width = 'auto' }) => (
  <img
    src={size}
    alt="Cycle headers"
    title="Cycle headers"
    height={height}
    width={width}
  />
)
