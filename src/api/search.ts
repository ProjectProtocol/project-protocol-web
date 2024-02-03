import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchMeta from '../types/SearchMeta'
import apiClient from './client'

export type SearchData = {
  meta: SearchMeta
  data: (Agent | Office)[]
}

export function emptySearch(): SearchData {
  return { meta: { total: 0, page: 0, totalPages: 0 },
           data: []}
}

interface SearchArgs {
  searchText?: string
  filter?: 'Agent' | 'Office'
  page?: number
}

export async function search({
  searchText,
  filter,
  page,
}: SearchArgs): Promise<SearchData> {
  const params = {
    search: searchText,
    filter,
    page,
    ...(searchText ? {} : { default: true }),
  }

  const { data }: { data: SearchData } = await apiClient.get('search', {
    params,
  })

  return { meta: data.meta as SearchMeta, data: data.data }
}
