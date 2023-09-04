import camelCase from 'lodash/camelCase'

const style = getComputedStyle(document.body)

// Dasherized theme color names as they appear in the sass stylesheets
const themeColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
  'brand',
  'rating-1',
  'rating-2',
  'rating-3',
  'rating-4',
  'rating-5',
] as const

function extractThemeColor(colorName: string) {
  return style.getPropertyValue(`--bs-${colorName}`)
}

const bootstrapVariables: { [key: string]: string } = {}
themeColors.forEach((c: string) => {
  const hexValue = extractThemeColor(c)
  bootstrapVariables[camelCase(c)] = hexValue
})

export const ratingColors = [
  bootstrapVariables.rating1,
  bootstrapVariables.rating2,
  bootstrapVariables.rating3,
  bootstrapVariables.rating4,
  bootstrapVariables.rating5,
]
console.log(ratingColors)

export default bootstrapVariables
