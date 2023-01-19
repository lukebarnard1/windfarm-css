import { css } from 'emotion'

import { generic } from '../../src/gen'
import { theme } from '../theme'

const Button = css`
  background-color: var(--color);
  outline: 0;

  color: var(--color-on);

  cursor: pointer;
  user-select: none;
  display: inline-block;

  text-decoration: none;

  border: 1px solid var(--color);
  border-radius: 4px;

  padding: 5px 10px;
  vertical-align: 0px;

  margin: var(--margin);

  position: relative;

  transition: 0.1s all;

  &.hol {
    color: var(--fg-color);
    padding: 5px 0px;
    :focus:not(:active),
    :hover:not(:active) {
      color: var(--fg-color-light);
    }
  }

  :active {
    transition: 0s;
  }

  :focus:not(:active),
  :hover:not(:active) {
    box-shadow: 0px 2px 1px var(--color-dark);
    transform: translate(0px, -2px);
  }
`

export default (props) =>
  generic({
    Tag: props.href ? 'a' : 'button',
    stylesheet: Button,
    theme,
    ...props
  })
