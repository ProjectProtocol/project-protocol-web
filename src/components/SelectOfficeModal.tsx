import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'
import PopUp from './PopUp'
import SearchMeta from 'src/types/SearchMeta'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ApiOffice } from 'src/api'
import AnimatedList from './AnimatedList'
import { InView } from 'react-intersection-observer'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  onChange: (s: string) => void
  searchText: string
  getMore: (p: number) => Promise<{ data: Office[]; meta: SearchMeta }>
  selectOffice: (o: Office) => void
}

export default function SelectOfficeModal({
  close,
  show,
  searchText,
  onChange,
  selectOffice,
}: ISelectOfficeModal) {
  const { t } = useTranslation()

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['offices', searchText],
      queryFn: async ({ pageParam = 0 }) =>
        await ApiOffice.list({ search: searchText, page: pageParam as number }),
      getNextPageParam: ({ meta }) =>
        meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
      initialPageParam: 0,
    })

  const meta = data.pages[0].meta

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
          onChange={(e) => {
            onChange(e.target.value)
          }}
          autoFocus
        />

        <p className="m-3">{t('agent.result', { count: meta.total })} </p>
        <div className="vertical-rhythm">
          {meta.total === 0 && (
            <p className="text-center my-5">{t('agent.noResults')}</p>
          )}

          {data.pages.map((p, i) => {
            const lastPage = i == data.pages.length - 1
            return (
              <AnimatedList
                key={`offce-search-page${i}-${p.data[0]?.id}`}
                immediate={!lastPage}
                delay={75}
              >
                {p.data.map((item) => (
                  <SearchResult
                    result={item}
                    key={`search-result-${item.id}-${item.type}`}
                    onClick={() => handleOfficeClick(item)}
                  />
                ))}
              </AnimatedList>
            )
          })}
          <InView
            as="div"
            data-testid="observation-target"
            onChange={(inView) =>
              inView && hasNextPage && !isFetching && fetchNextPage()
            }
          />
        </div>
      </div>
    </PopUp>
  )
}
