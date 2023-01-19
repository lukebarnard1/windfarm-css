import { css } from 'emotion'

import { generic } from '../../src/gen'
import { theme } from '../theme'

const Text = css`
  margin-block-start: 12px;
  margin-block-end: 12px;

  color: var(--fg-color);

  // TODO: Maybe deprecate this in favour of Button /w href + hol
  &.int {
    cursor: pointer;
    text-decoration: none;

    :before {
      content: '>';
    }

    :active {
      transition: 0s;
    }

    :focus:not(:active),
    :hover:not(:active) {
      color: var(--fg-color-light);
    }
  }
`

export default (props) =>
  generic({
    Tag: props.s_xl ? 'h1' : props.s_lg ? 'h2' : (props.href ? 'a' : 'p'),
    stylesheet: Text,
    theme,
    ...props
  })
