import { Form, useSearchParams, useSubmit } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceFilters from 'src/components/Resources/ResourceFilters'
import Resource, { ResourceTag } from 'src/types/Resource'
import { useInfiniteQuery } from '@tanstack/react-query'
import useLoadingBar from 'src/hooks/useLoadingBar'
import { useMemo } from 'react'
import SearchBar from 'src/components/SearchBar'
import { ApiResources } from 'src/api'
import { InView } from 'react-intersection-observer'
import { debounce } from 'lodash-es'

export default function Resources() {
  const { t } = useTranslation()
  const submit = useSubmit()
  const [params, setParams] = useSearchParams()
  const searchParam: string = useMemo(
    () => params.get('search') || '',
    [params],
  )

  const tagsParam: ResourceTag[] = useMemo(
    () => params.getAll('tags') as ResourceTag[],
    [params],
  )

  const distance = useMemo(() => params.get('distance') || undefined, [params])
  const location = useMemo(() => params.get('location') || undefined, [params])

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['resourceSearch', searchParam, distance, location, ...tagsParam],
    queryFn: async ({ pageParam = 0 }) =>
      await ApiResources.list({
        search: searchParam,
        page: pageParam as number,
        distance,
        location,
        tags: tagsParam,
      }),

    getNextPageParam: ({ meta }) =>
      meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
    initialPageParam: 0,
  })

  useLoadingBar(isFetching)

  const handleInput = debounce((event) => {
    submit(event.target.form, { replace: true })
  }, 500)

  return (
    <div className="vertical-rhythm">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="m-0 p-0">{t('resources.title')}</h2>
        <a
          className="btn btn-cobalt"
          href="https://airtable.com/shrPJ7SKahULdzcMj"
          target="_blank"
        >
          {t('resources.suggestResource')}
        </a>
      </div>
      <Form>
        <SearchBar
          name="search"
          placeholder={t('resources.searchPlaceholder')}
          size="lg"
          onClear={() => {
            params.delete('search')
            setParams(params)
          }}
          defaultValue={searchParam}
          onChange={handleInput}
          activeColor="cobalt"
          inactiveColor="light-cobalt"
          autoFocus
        />
      </Form>
      <ResourceFilters currentFilters={tagsParam} setParams={setParams} />
      <div className="vertical-rhythm">
        {data &&
          data.pages.map((p) => {
            return p.data.map((r: Resource, i: number) => (
              <ResourceCard resource={r} index={i} key={`resource-card-${i}`} />
            ))
          })}
        <InView
          as="div"
          data-testid="observer-target"
          onChange={(inView) =>
            inView && hasNextPage && !isFetching && fetchNextPage()
          }
        />
      </div>
    </div>
  )
}
