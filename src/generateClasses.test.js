import { computeValue } from './generateClasses'

describe('computeValue', () => {
  describe('scalar', () => {
    it('should compute scalar values', () => {
      const val = computeValue({
        value: {
          abc: 100
        }
      }, 'abc', 0)
      expect(val).toBe('100')
    })
    it('should apply modify field, multiply', () => {
      const val = computeValue({
        value: {
          abc: 100
        },
        modify: {
          multiply: 5
        }
      }, 'abc', 0)
      expect(val).toBe('500')
    })
  })
  describe('hsl', () => {
    it('should compute HSL values', () => {
      const val = computeValue({
        type: 'hsl',
        value: {
          abc: [0.5, 0.5, 0.5]
        }
      }, 'abc', 0)
      expect(val).toBe('hsl(0.5,50%,50%)')
    })
    it('should apply modify field, multiply', () => {
      const val = computeValue({
        type: 'hsl',
        value: {
          abc: [0.5, 0.5, 0.5],
        },
        modify: {
          hsl_multiply: 0.1
        }
      }, 'abc', 0)
      expect(val).toBe('hsl(0.5,50%,5%)')
    })
    it('should apply modify field, gate (off)', () => {
      const val = computeValue({
        type: 'hsl',
        value: {
          abc: [0.5, 0.5, 0.5],
        },
        modify: {
          hsl_gate: 0.4
        }
      }, 'abc', 0)
      expect(val).toBe('hsl(0,0%,0%)')
    })
    it('should apply modify field, gate (on)', () => {
      const val = computeValue({
        type: 'hsl',
        value: {
          abc: [0.5, 0.5, 0.5],
        },
        modify: {
          hsl_gate: 0.6
        }
      }, 'abc', 0)
      expect(val).toBe('hsl(0,0%,100%)')
    })
    it('should apply modify field, threshold', () => {
      const val = computeValue({
        type: 'hsl',
        value: {
          abc: [0.5, 0.5, 0.5],
        },
        modify: {
          hsl_threshold: 0.3
        }
      }, 'abc', 0)
      expect(val).toBe('hsl(0.5,50%,30%)')
    })
  })
})
