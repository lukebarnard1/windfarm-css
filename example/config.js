export const config = {
  constants: {
    unit: 12,
    colors: {
      0: [0, 0, 0.0],
      1: [0, 0, 1.0],
      p1: [160, 0.60, 1.0],
      p2: [165, 0.70, 0.90],
      p3: [156, 0.80, 0.80],
      p4: [154, 0.90, 0.70],
      p5: [158, 1.0, 0.50],
      p6: [156, 0.83, 0.40],
      p7: [156, 0.71, 0.30],
      p8: [158, 0.67, 0.20],
      p9: [163, 1.0, 0.10],
      s1: [60, 0.60, 1.0],
      s2: [51, 0.70, 0.90],
      s3: [52, 0.80, 0.80],
      s4: [53, 0.90, 0.70],
      s5: [54, 1.0, 0.49],
      s6: [52, 0.83, 0.45],
      s7: [51, 0.71, 0.30],
      s8: [45, 0.67, 0.20],
      s9: [40, 1.0, 0.10]
    },
  },
  customClassNames: [
    'int',
    'tmp_ld',
    'on',
    'hol',
    'row',
    'col',
    'bgn',
    'mid',
    'end',
    'wrp',
  ],
  rules: [
    // TODO:
    //  - Specify this + custom classes "on" in Card.js
    //  - OR implement "prop" variant.
    {
      prefix: 'card_s_',
      variants: ['lg', 'md', 'sm'],
      properties: {
        padding: {
          value: [4, 2, 1],
          modify: {
            multiply: '@unit'
          },
          unit: 'px'
        },
        'border-radius': {
          value: [1.5, 1, 0.5],
          modify: {
            multiply: '@unit'
          },
          unit: 'px'
        },
      }
    },
    {
      prefix: 'fc_',
      variants: '@colors',
      properties: {
        '--fg-color': {
          type: 'hsl',
          value: '@colors'
        },
        '--fg-color-light': {
          type: 'hsl',
          modify: {
            hsl_multiply: 1.5
          },
          value: '@colors'
        }
      }
    },
    {
      prefix: 'c_',
      variants: '@colors',
      properties: {
        '--color': {
          type: 'hsl',
          value: '@colors'
        },
        // The color of icons/text that appears "on" a
        // background of --color
        '--color-on': {
          type: 'hsl',
          modify: { hsl_gate: 0.4 },
          value: '@colors'
        },
        '--color-light': {
          type: 'hsl',
          modify: { hsl_multiply: 1.1 },
          value: '@colors'
        },
        '--color-dark': {
          type: 'hsl',
          modify: { hsl_threshold: 0.3 },
          value: '@colors'
        }
      }
    },
    {
      prefix: 's_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      variantDefault: 'md',
      properties: {
        'line-height': '1.5em',
        'font-size': {
          value: [10, 12, 16, 24, 48],
          unit: 'px'
        },
        'font-weight': {
          value: [500, 500, 500, 600, 600],
        },
        'letter-spacing': {
          value: [0.05, 0.03, 0.02, -0.04, -0.04],
          unit: 'em'
        }
      }
    },
    {
      prefix: 'wi_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        'width': {
          value: [16, 32, 64, 256, 512],
          unit: 'px'
        }
      }
    },
    {
      prefix: 'he_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        'height': {
          value: [16, 32, 64, 256, 512],
          unit: 'px'
        }
      }
    },
    {
      prefix: 'br_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        'border-radius': {
          value: ['2px', '8px', '16px', '32px', '64px'],
        }
      }
    },
    {
      prefix: 'w_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      variantDefault: 'md',
      properties: {
        'font-weight': {
          value: [100, 400, 500, 700, 800],
        }
      }
    },
    {
      prefix: 'al_',
      variants: ['lft', 'cen', 'rgt', 'jst'],
      properties: {
        'text-align': {
          value: {
            lft: 'left',
            cen: 'center',
            rgt: 'right',
            jst: 'justify'
          }
        }
      }
    },
    {
      prefix: 'ov_',
      variants: ['clp'],
      properties: {
        'overflow': {
          value: {
            clp: 'hidden'
          }
        }
      }
    },
    {
      prefix: 'cen_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        'margin': 'auto',
        'max-width': {
          value: {
            xs: '300px',
            sm: '600px',
            md: '750px',
            lg: '900px',
            xl: '1000px'
          }
        }
      }
    },
    {
      prefix: 'flx_',
      variants: ['exp', 'sta', 'shr'],
      properties: {
        'flex-grow': { value: { exp: 1, sta: 0 } },
        'flex-shrink': { value: { sta: 0, shr: 1 } }
      }
    },
    {
      prefix: 'm_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        margin: {
          value: [1/4, 1/2, 1, 2, 4],
          modify: {
            multiply: '@unit'
          },
          unit: 'px'
        }
      }
    },
    {
      prefix: 'p_',
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
      properties: {
        padding: {
          unit: 'px',
          value: [1/4, 1/2, 1, 2, 4],
          modify: {
            multiply: '@unit'
          },
        }
      }
    },
  ]
}
