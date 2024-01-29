import { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import SearchMeta from 'src/types/SearchMeta'
import { useInView } from 'react-intersection-observer'

interface IPaginator<T> {
  data: T[]
  meta: SearchMeta
  getData: (page: number) => Promise<{ data: T[]; meta: SearchMeta }>
  keyGenerator: (item: T) => string
  ItemComponent: React.FC<{ item: T }>
}
export default function Paginator<T>({
  data,
  meta,
  getData,
  keyGenerator,
  ItemComponent,
}: IPaginator<T>) {
  const { ref, inView } = useInView()
  const [page, setPage] = useState(meta.page)
  const [totalPages, setTotalPages] = useState(meta.totalPages)
  const [items, setItems] = useState<T[]>(data || [])
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    setItems(data)
    setPage(meta.page)
    setTotalPages(meta.totalPages)
  }, [data, meta])

  /**
   * Get more data from the API.
   */
  const getMore = useCallback(async () => {
    if (page >= totalPages - 1 || pageLoading) return

    setPageLoading(true)
    const newData = await getData(page + 1)
    setItems([...items, ...newData.data])
    setPage(newData.meta.page)
    setTotalPages(newData.meta.totalPages)
    setPageLoading(false)
  }, [page, totalPages, pageLoading, items, getData])

  /**
   * Observe the observerTarget and call getMore() when it is intersecting.
   */
  useEffect(() => {
    if (inView) {
      getMore()
    }
  }, [inView, getMore])

  return (
    <>
      {items.map((i: T) => (
        <ItemComponent item={i} key={keyGenerator(i)} />
      ))}
      <div className="text-center" ref={ref} data-testid="observer-target">
        {pageLoading && <Spinner variant="dark" />}
      </div>
    </>
  )
}
