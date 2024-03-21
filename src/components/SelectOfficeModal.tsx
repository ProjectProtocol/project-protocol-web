import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'
import PopUp from './PopUp'
import Paginator from 'src/components/Paginator'
import SearchMeta from 'src/types/SearchMeta'
import { SearchData } from 'src/types/SearchData'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  officeSearch: SearchData<Office>
  onChange: (s: string) => void
  searchText: string
  getMore: (p: number) => Promise<{ data: Office[]; meta: SearchMeta }>
  selectOffice: (o: Office) => void
}

export default function SelectOfficeModal({
  close,
  show,
  officeSearch,
  searchText,
  getMore,
  onChange,
  selectOffice,
}: ISelectOfficeModal) {
  const { t } = useTranslation()

  const handleOfficeClick = (o: Office) => {
    selectOffice(o)
    close()
  }

  return (
    <PopUp
      title={t('agent.selectOffice')}
      closeButton
      show={show}
      size={undefined}
      scrollable
      centered={false}
      bodyClass="p-3"
      onHide={close}
    >
      <div className="pt-3">
        <SearchBar
          id="search"
          name="search"
          aria-label={t('agent.searchOffices')}
          size="lg"
          placeholder={t('agent.searchOffices')}
          type="text"
          defaultValue={searchText}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />

        <p className="m-3">
          {t('agent.result', { count: officeSearch.meta.total })}{' '}
        </p>
        <div className="vertical-rhythm">
          {officeSearch.meta.total === 0 && (
            <p className="text-center my-5">{t('ui.noResults')}</p>
          )}

          <Paginator<Office>
            data={officeSearch.data}
            meta={officeSearch.meta}
            getData={getMore}
            keyGenerator={(r) => `search-result-${r.id}-${r.type}`}
            ItemComponent={({ item }) => (
              <SearchResult
                result={item}
                key={`search-result-${item.id}-${item.type}`}
                onClick={() => handleOfficeClick(item)}
              />
            )}
          />
        </div>
      </div>
    </PopUp>
  )
}
