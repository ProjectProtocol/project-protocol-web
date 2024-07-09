import { Form, useSubmit, useNavigate, useSearchParams } from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash-es'
import SearchBar from 'src/components/SearchBar'
import Agent from 'src/types/Agent'
import AddAgentCard from 'src/components/AddAgentCard'
import AnimatedList from 'src/components/AnimatedList'
import Office from 'src/types/Office'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import ConfirmationModal from 'src/components/ConfirmationModal'
import { useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ApiSearch } from 'src/api'
import { InView } from 'react-intersection-observer'
import useLoadingBar from 'src/hooks/useLoadingBar'
import PageHeader from 'src/components/PageHeader'
import { T, useTranslate } from '@tolgee/react'
import ModerationInfoModal from 'src/components/ModerationInfoModal'

export default function Search() {
  const [params] = useSearchParams()
  const searchParam: string = useMemo(
    () => params.get('search') || '',
    [params],
  )

  const queryClient = useQueryClient()
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['search', searchParam],
      queryFn: async ({ pageParam = 0 }) =>
        await ApiSearch.search({
          searchText: searchParam,
          page: pageParam as number,
        }),
      getNextPageParam: ({ meta }) =>
        meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
      initialPageParam: 0,
      staleTime: 1000 * 60 * 5,
    })

  useLoadingBar(isFetching)

  const meta = data?.pages[0].meta

  const submit = useSubmit()
  const navigate = useNavigate()
  const { t } = useTranslate('rate_my_po')
  const { user, refreshUser } = useAuth()
  const { openLogin } = useLogin()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModerationModal, setShowModerationModal] = useState(
    !user?.isPolicyAcknowledged,
  )

  useEffect(() => {
    const searchEl = document.getElementById('search') as HTMLInputElement
    searchEl.value = searchParam as string
  }, [searchParam])

  const handleInput = debounce((event) => {
    queryClient.invalidateQueries({ queryKey: ['search'] })
    submit(event.target.form, { replace: true })
  }, 500)

  const handleResultClick = (r: Agent | Office) => {
    const resultType = r.type
    const targetUrl = `/${resultType.toLowerCase()}s/${r.id}`
    return () => navigate(targetUrl, { state: { [resultType]: r } })
  }

  const handleClick = () => {
    refreshUser()
    setShowModerationModal(false)
  }

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t('title')} showBack={false} />
      <Form id="search-form" role="search" className="mb-3 position-relative">
        <SearchBar
          id="search"
          aria-label={t('placeholder')}
          size="lg"
          placeholder={t('placeholder')}
          name="search"
          onClear={() => navigate('/', { replace: true })}
          defaultValue={searchParam}
          onChange={handleInput}
          autoFocus
        />
      </Form>
      <div className="vertical-rhythm">
        <p className="soft">
          {searchParam !== '' ? (
            <T
              keyName="resultsDisplayed"
              ns="rate_my_po"
              params={{
                total: meta?.total,
              }}
            />
          ) : (
            t('mostRecent')
          )}
        </p>
        {data.pages.map((p, i) => {
          const lastPage = i === data.pages.length - 1
          return (
            <AnimatedList
              key={`search-result-page-${i}-${p.data[0]?.id}`}
              immediate={!lastPage}
              delay={75}
            >
              {p.data.map((item) => (
                <SearchResult
                  result={item}
                  key={`search-result-${item.id}-${item.type}`}
                  onClick={handleResultClick(item)}
                />
              ))}
              {lastPage && (
                <AddAgentCard
                  user={user}
                  openLogin={openLogin}
                  navigate={navigate}
                  showConfirmModal={() => setShowConfirmModal(true)}
                />
              )}
            </AnimatedList>
          )
        })}
        <InView
          as="div"
          data-testid="observer-target"
          onChange={(inView) =>
            inView && hasNextPage && !isFetching && fetchNextPage()
          }
        />
        {user && (
          <ConfirmationModal
            show={showConfirmModal}
            onHide={() => setShowConfirmModal(false)}
            title={t('confirmAccountToAddAgent')}
            bodyClass="px-4"
            user={user}
            closeButton
          />
        )}
        {user && (
          <ModerationInfoModal
            show={showModerationModal}
            closeButton={false}
            onHide={handleClick}
          ></ModerationInfoModal>
        )}
      </div>
    </div>
  )
}
