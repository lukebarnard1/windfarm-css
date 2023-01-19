import { css } from 'emotion'

import { generic } from '../../src/gen'
import { theme } from '../theme'

const Card = css`
  border-radius: 6px;
  box-shadow: -1px 1px 3px #0004;

  background-color: transparent;
  color: var(--fg-color);

  outline: 0;
  border: 0;

  &.on {
    background-color: var(--color);
    --fg-color: var(--color-on);
  }

  &.tmp_ld {
    opacity: 0.5;
  }

  > :first-child {
    margin-block-start: 0px;
  }
  > :last-child {
    margin-block-end: 0px;
  }

  &.int {
    cursor: pointer;
    user-select: none;
    text-align: unset;
    transition: 0.1s all;

    :active {
      transition: 0s;
    }

    :focus:not(:active),
    :hover:not(:active) {
      box-shadow: -1px 5px 6px #aaa;
      transform: translate(0px, -3px);
    }
  }
`

export default (props) =>
  generic({
    Tag: props.int ? 'button' : 'div',
    stylesheet: Card,
    tabIndex: props.int ? '0' : undefined,
    theme,
    ...props
  })
