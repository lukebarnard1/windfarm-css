import { css } from 'emotion'

import { theme } from '../theme'
import { generic } from '../../src/gen'

export default (props) => {
  return generic({
    Tag: 'input',
    stylesheet: () => css`
      color: var(--fg-color);
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid black;

      ::selection {
        background: var(--fg-color);
        color: var(--color-off);
      }

      :focus {
        box-shadow: inset 0px 2px 1px var(--color-dark);
        outline: 0;
      }

      &.int {
        text-decoration: none;

        :active {
          transition: 0s;
        }

        :focus:not(:active),
        :hover:not(:active) {
          color: var(--color-light);
        }
      }
    `,
    theme,
    ...props
  })
}
