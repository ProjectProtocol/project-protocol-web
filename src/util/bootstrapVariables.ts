import rawBootstrapStyle from '../styles/bootstrap-theme/export.module.scss'
export const raw = rawBootstrapStyle

// Dasherized theme color names as they appear in the sass stylesheets
export const themeColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'loquat',
  'mediumGray',
  'dark',
  'white',
  'rating1',
  'rating2',
  'rating3',
  'rating4',
  'rating5',
] as const

type ThemeColor = (typeof themeColors)[number]
type BootstrapVariables = Record<ThemeColor, string>

const bootstrapVariables: BootstrapVariables = raw as BootstrapVariables

export const ratingColors = [
  bootstrapVariables.rating1,
  bootstrapVariables.rating2,
  bootstrapVariables.rating3,
  bootstrapVariables.rating4,
  bootstrapVariables.rating5,
]

export default bootstrapVariables
