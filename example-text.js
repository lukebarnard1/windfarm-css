
const qbf = 'The quick brown fox jumps over the lazy dog. '

export const generateText = ({
  sentences
} = {}) => {
  if (typeof sentences === 'number') {
    return new Array(sentences).fill(qbf).join('')
  }
  return qbf
}
