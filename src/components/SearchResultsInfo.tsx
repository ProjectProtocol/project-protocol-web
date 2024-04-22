import { t } from 'i18next'
import SearchMeta from 'src/types/SearchMeta'

interface ISearchResultsInfo {
  meta: SearchMeta
}

export default function SearchResultsInfo({ meta }: ISearchResultsInfo) {
  return meta.total === 0 ? (
    <p className="p-4 text-center text-dark fw-normal">{t('ui.noResults')}</p>
  ) : (
    <p>
      {t('search.resultsDisplayed', {
        total: meta.total,
      })}
    </p>
  )
}
