export const getThemeFlags = (customClassNames = [], rules) =>
  new Set([
    ...customClassNames,
    ...rules.map(r => r.variants.map(v => r.prefix + v)),
    // "Inner" prefix for all rules, which applies rules to children
    ...rules.map(r => r.variants.map(v => 'i' + r.prefix + v)),
  ].flat())
const getConstant = (rawName, config) => {
  const name = rawName.slice(1)
  return config.constants[name]
}
const getVariants = (rule, config) => {
  if (Array.isArray(rule.variants)) {
    return rule.variants
  }
  if (typeof rule.variants === 'string' && rule.variants[0] === '@') {
    const value = getConstant(rule.variants, config)
    if (value !== null && typeof value === 'object') {
      return Object.keys(value)
    }
  }
  return []
}

const resolveModify = (m, config) => {
  return Object.keys(m).reduce((acc, key) => {
    const value = m[key]
    return {
      ...acc,
      [key]: typeof value === 'string' ? (getConstant(value, config) || value) : value
    }
  }, {})
}

const getProperties = (rule, config) => {
  return Object.keys(rule.properties)
    .reduce((acc, propertyName) => {
      const property = rule.properties[propertyName]

      if (typeof property === 'string') {
        return {
          ...acc,
          [propertyName]: property
        }
      }

      if (typeof property === 'object') {
        const propertyRule = {
          ...property,
          // Resolve the values of any constants referenced, like '@constant_name'
          value:
            typeof property.value === 'string' ? (getConstant(property.value, config) || property.value) : property.value
        }
        if (property.modify) {
          propertyRule.modify = resolveModify(property.modify, config)
        }
        return {
          ...acc,
          [propertyName]: propertyRule
        }
      }

      console.warn('Ignoring property', property)

      return acc
    }, {})
}

export function generateRules (config) {
  return config.rules.map(rule => ({
    prefix: rule.prefix,
    prop: rule.prop,
    variants: getVariants(rule, config),
    properties: getProperties(rule, config)
  }))
}
