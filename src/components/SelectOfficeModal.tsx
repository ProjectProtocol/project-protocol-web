import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'
import PopUp from './PopUp'
import { SearchData } from 'src/api/search'
import Paginator from 'src/components/Paginator'
import { ApiSearch } from 'src/api'
import SearchMeta from 'src/types/SearchMeta'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  officeSearch: SearchData
  onChange: (s: string) => void
  searchText: string
  selectOffice: (o: Office) => void
}

export default function SelectOfficeModal({
  close,
  show,
  officeSearch,
  searchText,
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
        {searchText !== '' ? (
          <div>
            <p className="m-3">
              {t('agent.result', { count: officeSearch.data.length })}{' '}
            </p>
            <div className="vertical-rhythm">
              {officeSearch.data.length === 0 ? (
                <p className="text-center my-5">{t('agent.noResults')}</p>
              ) : (
                <Paginator<Office>
                  data={officeSearch.data as Office[]}
                  meta={officeSearch.meta}
                  getData={ async (page: number = 0) => {
                    const data = await ApiSearch.search({ searchText: searchText, page })
                    return data as {
                      meta: SearchMeta
                      data: Office[]}
                  }}
                  keyGenerator={(r) => `search-result-${r.id}-${r.type}`}
                  ItemComponent={({ item }) => (
                  <SearchResult
                    result={item}
                    key={`search-result-${item.id}-${item.type}`}
                    onClick={() => handleOfficeClick(item)}
                  />
                  )}
                />)
              }
            </div>
          </div>
        ) : (
          <p className="text-center my-5">{t('agent.searchByAddress')}</p>
        )}
      </div>
    </PopUp>
  )
}
