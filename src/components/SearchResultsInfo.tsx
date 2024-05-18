import { T, useTranslate } from '@tolgee/react'
import SearchMeta from 'src/types/SearchMeta'

interface ISearchResultsInfo {
  meta: SearchMeta
}

export default function SearchResultsInfo({ meta }: ISearchResultsInfo) {
  const { t } = useTranslate('rate_my_po')
  return meta.total === 0 ? (
    <p className="p-4 text-center text-dark fw-normal">
      {t('noResults', { ns: 'shared' })}
    </p>
  ) : (
    <p>
      <T
        keyName="resultsDisplayed"
        ns="rate_my_po"
        params={{ total: meta.total }}
      />
    </p>
  )
}
