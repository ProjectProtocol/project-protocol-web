import { t } from 'i18next'
import SearchMeta from 'src/types/SearchMeta'

interface ISearchResultsInfo {
  meta: SearchMeta
}

export default function SearchResultsInfo({ meta }: ISearchResultsInfo) {
  return meta.total === 0 ? (
    <h3 className="p-4 text-center">{t('ui.noResults')}</h3>
  ) : (
    <p>
      {t('search.resultsDisplayed', {
        total: meta.total,
      })}
    </p>
  )
}
