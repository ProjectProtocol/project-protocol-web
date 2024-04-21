import { t } from 'i18next'
import SearchMeta from 'src/types/SearchMeta'

interface IEmptyList {
  meta?: SearchMeta
}

export default function EmptyList({ meta }: IEmptyList) {
  if (!meta) {
    return null
  }

  return meta.total === 0 ? (
    <h3 className="m-4 text-center">{t('ui.noResults')}</h3>
  ) : (
    <p>
      {t('search.resultsDisplayed', {
        total: meta.total,
      })}
    </p>
  )
}
