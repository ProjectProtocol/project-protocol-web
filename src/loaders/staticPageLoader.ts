import { createClient } = require('contentful/dist/contentful.browser.min.js')
import Constants from 'expo-constants'

const contentfulClient = createClient({
  space: Constants.expoConfig.extra.contentfulSpaceId,
  accessToken: Constants.expoConfig.extra.contentfulDeliveryApiKey
})

const Contentful = {
  ids: {
    ABOUT_US: '01l6lbfvmtbqQHjt7LuUFL',
    WHY_EMAIL: '6K61ZF3VLMPMi0BjOQ3gjk',
    ETHICAL_PRINCIPLES: '6UFa3N1g7ytcAxeBCQVyTY',
    HOW_DOES_IT_WORK: '1BQDLK4P2L1E0DmCwLOrDR'
  },
  getEntry: contentfulClient.getEntry,
  getEntries: contentfulClient.getEntries
}

export default Contentful
