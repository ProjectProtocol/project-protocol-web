import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'
import PopUp from './PopUp'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  offices: Office[]
  onChange: (s: string) => void
  searchText: string
  selectOffice: (o: Office) => void
}

export default function SelectOfficeModal({
  close,
  show,
  offices,
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
      title="Select an office"
      closeButton
      show={show}
      size={undefined}
      scrollable
      centered={false}
      onHide={close}
    >
      <div className="pt-3">
        <SearchBar
          id="search"
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
              {t('agent.result', { count: offices.length })}{' '}
            </p>
            <div>
              {offices.length === 0 ? (
                <p className="m-5 p-4">{t('agent.noResults')}</p>
              ) : (
                offices.map((r) => (
                  <SearchResult
                    result={r as Office}
                    key={r.id}
                    onClick={() => handleOfficeClick(r)}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <p className="m-5">{t('agent.searchByAddress')}</p>
        )}
      </div>
    </PopUp>
  )
}
