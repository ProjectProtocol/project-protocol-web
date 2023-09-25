import { createClient } from 'contentful'

// CONTENTFUL_SPACE_ID=zwkgwua3qde9
// CONTENTFUL_DELIVERY_API_KEY=kKEOXwvZcsASfym1i7BjO-g65KX5esCTa08w9rGHYBg
const contentfulClient = createClient({
  space: 'zwkgwua3qde9',
  accessToken: 'KEOXwvZcsASfym1i7BjO-g65KX5esCTa08w9rGHYBg'
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

// export default Contentful

export default async function staticPageLoader() {
  console.log(Contentful)
  return Contentful
}
