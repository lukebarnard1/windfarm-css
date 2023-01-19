import React from 'react'
import { css } from 'emotion'
import { getThemeFlags, generateRules } from '../src/rules'
import generateClasses from '../src/generateClasses'

import { config } from './config'
/**
 * CSS to apply to the root element.
 */
export const root = css`
  font-family: BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
`

/**
 * CSS rules generated from the theme config.
 */
let RULES_CSS

export const theme = (() => {
  const rules = generateRules(config)

  if (RULES_CSS === undefined) {
    RULES_CSS = rules.map((r) => generateClasses(r))
  }

  // TODO: Maybe inject the project name here
  const Default = css`
    ${RULES_CSS};
  `

  return {
    className: Default,
    flags: getThemeFlags(config.customClassNames, rules)
  }
})()

export const RootDecorator = (Story) => (
  <div className={root}><Story /></div>
)
