import { useCallback, useEffect, useState } from 'react'
import SearchMeta from 'src/types/SearchMeta'

interface IUsePagination<T> {
  data: T[]
  meta: SearchMeta
  observerTarget: React.RefObject<HTMLDivElement>
  getData: (page: number) => Promise<{ data: T[]; meta: SearchMeta }>
}

export default function usePagination<T>({
  data,
  meta,
  observerTarget,
  getData,
}: IUsePagination<T>) {
  const [page, setPage] = useState(meta.page)
  const [totalPages, setTotalPages] = useState(meta.totalPages)
  const [items, setItems] = useState(data)
  const [pageLoading, setPageLoading] = useState(false)

  const getMore = useCallback(async () => {
    if (page >= meta.totalPages - 1 || pageLoading) return

    setPageLoading(true)
    const newData = await getData(page + 1)
    setItems([...items, ...newData.data])
    setPage(newData.meta.page)
    setPageLoading(false)
  }, [page, meta, items, getData, pageLoading])

  useEffect(() => {
    const currentObserverTarget = observerTarget.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMore()
        }
      },
      { threshold: 1 },
    )
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget)
    }
    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget)
      }
    }
  }, [observerTarget, getMore])

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    items,
    setItems,
    pageLoading,
  }
}
