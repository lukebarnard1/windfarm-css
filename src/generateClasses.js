
const hsl = ([h, ...rest]) =>
  `hsl(${[h, ...rest.map(a => `${a * 100}%`)].join(',')})`

const hsl_gate = (t) => ([h, s, l]) => ([0, 0, l > t ? 0.0 : 1.0])
const hsl_multiply = (t) => ([h, s, l]) => ([h, s, l * t])
const hsl_threshold = (t) => ([h, s, l]) => ([h, s, l > t ? t : l])

const applyModify = (prop, val) => {
  if (prop.modify) {
    if (prop.modify.multiply) {
      val = val * prop.modify.multiply
    }
    if (prop.modify.hsl_gate) {
      val = hsl_gate(prop.modify.hsl_gate)(val)
    }
    if (prop.modify.hsl_multiply) {
      val = hsl_multiply(prop.modify.hsl_multiply)(val)
    }
    if (prop.modify.hsl_threshold) {
      val = hsl_threshold(prop.modify.hsl_threshold)(val)
    }
  }
  return val
}

export const computeValue = (prop, v, vx) => {
  if (typeof prop === 'function') {
    return prop(v, vx)
  }
  if (typeof prop === 'string') {
    return prop + ( prop.unit || '')
  }

  let val
  if (Array.isArray(prop.value)) {
    val = prop.value[vx]
  } else if (typeof prop.value === 'object') {
    val = prop.value[v]
  }

  val = applyModify(prop, val)

  if (prop.type === 'hsl') {
    return hsl(val)
  }
  return val + ( prop.unit || '')
}

/**
 * Takes a theme configuration rule and generates the CSS for that rule as a
 * single string.
 */
function generateClasses ({
  prefix,
  variants,
  variantDefault,
  properties,
  inner
} = {}) {
  const rules = []

  // If a default for the variant exists, set this property without a selector.
  // All elements will be given this property by default.
  if (variantDefault) {
    rules.push(
      Object.keys(properties)
        .map(p => {
          const val = properties[p](variantDefault, variants.indexOf(variantDefault))
          return `${p}: ${val};`
        }).join('')
    )
  }

  // For any elements with a classname that matches i[prefix], set the same properties
  // on all children of the element.
  variants.map((v, vx) => rules.push(`
    &.i${prefix}${v} {
      > * {
        ${Object.keys(properties).map(p => `${p}: ${computeValue(properties[p], v, vx)};`).join('')}
      }
    }
  `))

  // Set the properties corresponding to the prefix and variant
  variants.map((v, vx) => rules.push(`
    &.${prefix}${v} {
      ${Object.keys(properties).map(p => `${p}: ${computeValue(properties[p], v, vx)};`).join('')}
    }
  `))

  return rules.join('')
}

export default generateClasses

