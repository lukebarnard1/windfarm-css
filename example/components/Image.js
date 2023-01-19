import { css } from 'emotion'

import { generic } from '../../src/gen'
import { theme } from '../theme'

export default (props) =>
  generic({
    Tag: 'img',
    theme,
    stylesheet: css`
      max-width: 100%;

      .rnd {
        border-radius: 50%;
      }
    `,
    ...props
  })
