import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import { theme, rules } from './theme'

import Card from './components/Card'
import Text from './components/Text'
import Button from './components/Button'
import Layout from './components/Layout'

const useContentEditable = () => {
  const [value, setValue] = useState()
  const props = {
    onInput: (ev) => {
      setValue(ev.target.innerText)
    },
    contentEditable: true
  }
  return [
    value,
    props
  ]
}

export const generic = ({
  children,
  Tag,
  classNames,
  stylesheet,
  ...rest
}) => {
  const [hasFocus, setFocus] = useState(false)

  const [value, props] = useContentEditable()

  const ref = React.createRef()

/*
  useEffect(() => {
    if (mode === 'edit') {
      ref.current.focus()
    } else {
      ref.current.blur()
    }
  }, [ref, mode])
  */

  // TODO in edit mode, show a panel somewhere to allow editing:
  //   - the text
  //   - CSS classes
  //     - with quick search over the defined ones
  //     - toggling existing ones
  //   - insertion of children
  //   - save React to clipboard

  const [before, setBefore] = useState([])
  const [after, setAfter] = useState([])

  const addChild = (isBefore, child) => {
    isBefore
      ? setBefore([child, ...before])
      : setAfter([...after, child])
  }

  const [isDeleted, setDeleted] = useState(false)


  const mode = 'edit'
  const [command, setCommand] = useState('')

  const [updatedCn, setUpdatedCn] = useState(classNames)

  if (isDeleted) return null

  const setClass = (cn, v) => {
    const newVal = `${cn}_${v}`
    if (v === undefined) {
      if (updatedCn.includes(cn) || updatedCn.find(c => cn === c.split('_')[0])) {
        setUpdatedCn(updatedCn.filter(c => cn !== c && cn !== c.split('_')[0]))
      } else {
        setUpdatedCn([...updatedCn, cn])
      }
      return
    }

    if (updatedCn.includes(newVal)) {
      setUpdatedCn([
        ...updatedCn.filter(c => c.slice(0, cn.length + 1) !== cn + '_'),
      ])
      return
    }
    setUpdatedCn([
      ...updatedCn.filter(c => c.slice(0, cn.length + 1) !== cn + '_'),
      newVal
    ])
  }

  const submit = () => {
    const tokens = command.split(/\s+/)
    const p = tokens[0]
    const val = tokens[1]

    setClass(p, val)
  }

  const { bottom, left } = (ref.current && ref.current.getBoundingClientRect()) || {}
  const { scrollTop } = (ref.current) || {}

  const floatStyle =
    { position: 'fixed', bottom: '10px', left: '10px', zIndex: 1 }

  const editor = (
    <Card
      on c_1
      p_sm
      s_md
      style={floatStyle}
      _cmp_ignore
    >
      <Text _cmp_ignore>
        {stylesheet && stylesheet.split('-').pop()}({Tag})
      </Text>
      <Card _cmp_ignore>
        {false && rules.map(({ prefix, variants })=> {
          return (
            <>
              {variants.map(v => (
                <Button c_0={updatedCn.includes(prefix + v)} s_sm p_xs onClick={() => setClass(prefix.slice(0, prefix.length - 1), v)}>
                  {prefix}{v}
                </Button>
          ))}</>
          )
        })}
      </Card>
      <input
        type='text'
        value={command}
        onChange={ev => setCommand(ev.target.value)}
        onKeyPress={ev => ev.key === 'Enter' ? submit() : null}
      />
      <Text _cmp_ignore>
        {updatedCn.join(', ')}
      </Text>
      <Layout im_sm row _cmp_ignore>
        <Button _cmp_ignore on c_p5 onClick={() => setDeleted(true)}> Delete </Button>
        Before:
        <Button _cmp_ignore on c_s3 onClick={() => addChild(true, (<Card p_sm>Card</Card>))}> Card </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(true, (<Button c_p4>Button</Button>))}> Button </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(true, (<Text>Text</Text>))}> Text </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(true, (<Layout>Layout</Layout>))}> Layout </Button>
        After:
        <Button _cmp_ignore on c_s3 onClick={() => addChild(false, <Card p_sm>Card</Card>)}> Card </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(false, <Button c_p4>Button</Button>)}> Button </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(false, <Text>Text</Text>)}> Text </Button>
        <Button _cmp_ignore on c_s3 onClick={() => addChild(false, <Layout>Layout</Layout>)}> Layout </Button>
      </Layout>
    </Card>
  )

  const toolbar = hasFocus && editor

  // Some components should not have editor UI (e.g., the editor UI)

  if (rest._cmp_ignore) {
    return React.createElement(
      Tag,
      {
        ref,
        ['data-cmp-editor']: true,
        className: [
          theme,
          stylesheet,
          ...(updatedCn || classNames)
        ].join(' '),
        contentEditable: false,
        ...rest,
      },
      children
    )
  }

  return React.createElement(
    Tag,
    {
        ref,
        ...(typeof children === 'string' ? props : null),
        onFocus: (ev) => {
          let p = ev.target
          while (p && p.parentNode !== document.body) {
            if (p.getAttribute('data-cmp-editor') === 'true') {
              return
            }
            p = p.parentNode
          }
          if (ev.target === ref.current) {
            setFocus(true)
          }
          ev.stopPropagation()
          ev.preventDefault()
        },
        onBlur: (ev) => {
          // If the focus leaves a child, reset
          let p = ev.relatedTarget
          while (p && p.parentNode !== document.body) {
            if (p.getAttribute('data-cmp-editor') === 'true') {
              return
            }
            p = p.parentNode
          }
          setFocus(false)
        },
        onKeyDown: (ev) => {
          // Don't fire on parents
          ev.stopPropagation()

          if (mode === 'command') {
            // ev.preventDefault()
            return
          }
          console.info(ev.key)

          // TODO
          // Key shortcuts to do actions on elements
          switch (ev.key) {
            case 'Escape':
            console.info('blur')
              ev.currentTarget.blur()
              setFocus(false)
              break;
            case '/':
              // TODO select input
              ev.preventDefault()
              break
          }
        },
        className: [
        css`
          transform: none !important;
        `,
          hasFocus ? css`
            outline: 1px auto #0006;
            outline-offset: 0px;
            :hover {
              outline: 1px auto black;
            }
          ` : '',
          css`
            :hover {
              outline: 1px dashed black;
            }
          `,
          theme,
          stylesheet,
          ...(updatedCn || classNames)
        ].join(' '),
        ...rest,
        // Some components define this, so make sure it's super-enabled
        tabIndex: 0
        },
       [...before, children, ...after, toolbar]
  )
}
