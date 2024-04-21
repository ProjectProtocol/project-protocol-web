import { t } from 'i18next'
import SearchMeta from 'src/types/SearchMeta'

interface IEmptyList {
  meta?: SearchMeta
}

export default function EmptyList({ meta }: IEmptyList) {
  return (
    meta &&
    (meta.total === 0 ? (
      <h3 className="m-4 text-center">{t('ui.noResults')}</h3>
    ) : (
      t('search.resultsDisplayed', {
        total: meta.total,
      })
    ))
  )
}
