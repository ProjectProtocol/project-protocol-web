const style = getComputedStyle(document.body)

// Dasherized theme color names as they appear in the sass stylesheets
export const themeColors = [
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

type ThemeColor = (typeof themeColors)[number]
type BootstrapVariables = Record<ThemeColor, string>

function extractThemeColor(colorName: string) {
  return style.getPropertyValue(`--bs-${colorName}`)
}

const bootstrapVariables: BootstrapVariables = themeColors.reduce(
  (obj: BootstrapVariables, c: string, i: number): BootstrapVariables => {
    const hexValue = extractThemeColor(c)
    obj[themeColors[i]] = hexValue
    return obj
  },
  {} as BootstrapVariables,
)

export const ratingColors = [
  bootstrapVariables['rating-1'],
  bootstrapVariables['rating-2'],
  bootstrapVariables['rating-3'],
  bootstrapVariables['rating-4'],
  bootstrapVariables['rating-5'],
]

export default bootstrapVariables
