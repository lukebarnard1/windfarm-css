import { generateRules } from './rules'

describe('rules', () => {
  describe('generateRules', () => {
    it('correctly generates a rule from configuration', () => {
      const result = generateRules({
        constants: {
          'colors': {
            primary: [123, 23, 12],
            secondary: [12, 23, 123],
          }
        },
        rules: [
          {
            prefix: 'bg_col_',
            variants: '@colors',
            properties: {
              '--bg-color': {
                type: 'hsl',
                value: '@colors'
              }
            }
          }
        ]
      })
      expect(result).toEqual([{
        prefix: 'bg_col_',
        variants: ['primary', 'secondary'],
        properties: {
          '--bg-color': {
            type: 'hsl',
            value: {
              primary: [123, 23, 12],
              secondary: [12, 23, 123],
            }
          }
        }
      }])
    })
    it('correctly allows usage of unit constant with scalar multiplication', () => {
      const result = generateRules({
        constants: {
          unit: 16
        },
        rules: [
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
          }
        ]
      })
      expect(result).toEqual([
          {
            prefix: 'm_',
            variants: ['xs', 'sm', 'md', 'lg', 'xl'],
            properties: {
              margin: {
                value: [1/4, 1/2, 1, 2, 4],
                modify: {
                  multiply: 16
                },
                unit: 'px'
              }
            }
          }
        ])
    })
    it('allows prop-based rules', () => {
      const result = generateRules({
        constants: {
          unit: 16
        },
        rules: [
          {
            prop: 'size',
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
          }
        ]
      })
      expect(result).toEqual([
          {
            prop: 'size',
            variants: ['xs', 'sm', 'md', 'lg', 'xl'],
            properties: {
              margin: {
                value: [1/4, 1/2, 1, 2, 4],
                modify: {
                  multiply: 16
                },
                unit: 'px'
              }
            }
          }
        ])
    })
  })
})
