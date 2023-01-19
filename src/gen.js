import React from 'react'

export const separateFlags = (props, theme) => {
  const filteredProps = {}
  const classNames = []
  Object.keys(props)
    .forEach(p => {
      if (theme.flags.has(p) && Boolean(props[p])) {
        classNames.push(p)
      } else {
        filteredProps[p] = props[p]
      }
    })

  return { filteredProps, classNames }
}

export const generic = ({
  children,
  after = null,
  before = null,
  Tag,
  stylesheet,
  theme,
  ...props
}) => {
  const { filteredProps, classNames } = separateFlags(props, theme)
  return React.createElement(
    Tag,
    {
      className: [
        theme.className,
        stylesheet,
        ...classNames
      ].join(' '),
      ...filteredProps
    },
    children
  )
}
