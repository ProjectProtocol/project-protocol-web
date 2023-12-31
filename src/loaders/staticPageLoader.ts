import { Entry } from 'contentful'
import { LoaderFunction } from 'react-router-dom'
import ContentfulClient from 'src/util/ContentfulClient'

const contentIds = {
  ABOUT_US: '01l6lbfvmtbqQHjt7LuUFL',
  WHY_EMAIL: '6K61ZF3VLMPMi0BjOQ3gjk',
  ETHICAL_PRINCIPLES: '6UFa3N1g7ytcAxeBCQVyTY',
  HOW_DOES_IT_WORK: '1BQDLK4P2L1E0DmCwLOrDR',
  VOTING_RIGHTS: '6VgcyUQKmZTr955WYmlhr8',
  TERMS_OF_SERVICE: '1acLWVokjkixcvTh0b3gup',
}

type ContentKey =
  | 'ABOUT_US'
  | 'WHY_EMAIL'
  | 'ETHICAL_PRINCIPLES'
  | 'HOW_DOES_IT_WORK'
  | 'VOTING_RIGHTS'
  | 'TERMS_OF_SERVICE'

export default function createStaticPageLoader(
  contentKey: ContentKey,
): LoaderFunction {
  const staticPageLoader = async (): Promise<Entry> => {
    const entry = await ContentfulClient.getEntry(contentIds[contentKey])

    return entry as Entry
  }

  return staticPageLoader
}
