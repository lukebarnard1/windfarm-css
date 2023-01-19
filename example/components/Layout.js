import { css } from 'emotion'

import { generic } from '../../src/gen'
import { theme } from '../theme'

// map a property or set of properties to class names + css

const Layout = css`
  &.row,
  &.col,
  &.wrp {
    display: flex;

    > * {
      //margin: 0px;
      //flex: 1;
    }
  }

  &.row {
    > * {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  &.col {
    flex-direction: column;
    height: 100%;

    > :first-child {
      margin-block-start: 0px;
    }
    > :last-child {
      margin-block-end: 0px;
    }
  }

  &.wrp {
    flex-wrap: wrap;
  }

  &.bgn, &.mid, &.end {
    display: flex;
    > * {
      flex-grow: 0;
      flex-basis: auto;
    }
  }

  &.bgn { justify-content: flex-start; }
  &.mid { justify-content: center; }
  &.end { justify-content: flex-end; }

  &.ov_clp {
    overflow: hidden;
  }
`

export default (props) => generic({
    Tag: 'div',
    stylesheet: Layout,
    theme,
    ...props
  })
