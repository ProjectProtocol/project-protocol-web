import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'
import PopUp from './PopUp'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { ApiOffice } from 'src/api'
import AnimatedList from './AnimatedList'
import { InView } from 'react-intersection-observer'
import { useState } from 'react'
import { debounce } from 'lodash-es'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  selectOffice: (o: Office) => void
}

export default function SelectOfficeModal({
  close,
  show,
  selectOffice,
}: ISelectOfficeModal) {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['offices', searchText],
    queryFn: async ({ pageParam = 0 }) =>
      await ApiOffice.list({ search: searchText, page: pageParam as number }),
    getNextPageParam: ({ meta }) =>
      meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
  })

  const meta = data?.pages[0]?.meta || { total: 0 }

  const queryData = data || { pages: [] }

  const handleOfficeClick = (o: Office) => {
    selectOffice(o)
    close()
  }

  const onChange = debounce(setSearchText, 500)

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
      <div className="pt-3" style={{ minHeight: '40vh' }}>
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

        <div className="vertical-rhythm pt-3">
          <p className="m-3">{t('agent.result', { count: meta.total })} </p>
          {meta.total === 0 && (
            <p className="text-center my-5">{t('agent.noResults')}</p>
          )}
          {queryData.pages.map((p, i) => {
            const lastPage = i == queryData.pages.length - 1
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
