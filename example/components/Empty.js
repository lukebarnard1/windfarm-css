import React from 'react'
export default () =>
  React.createElement(
    'div',
    { dangerouslySetInnerHTML: { __html: '&nbsp;' } }
  )
