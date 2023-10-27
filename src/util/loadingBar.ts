import topbar from 'topbar'
import bootstrapVariables from './bootstrapVariables'

topbar.config({
  barColors: {
    '0': bootstrapVariables.primary,
    '.3': bootstrapVariables.secondary,
    '1.0': bootstrapVariables['rating-3'],
  },
})

const loadingBar = topbar

export default loadingBar
