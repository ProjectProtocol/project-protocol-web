import { SearchData } from 'src/types/SearchData'
import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchMeta from '../types/SearchMeta'
import apiClient from './client'

export type SearchResult = Agent | Office

interface SearchArgs {
  searchText?: string
  filter?: 'Agent' | 'Office'
  page?: number
}

export async function search({
  searchText,
  filter,
  page,
}: SearchArgs): Promise<SearchData<SearchResult>> {
  const params = {
    search: searchText,
    filter,
    page,
    ...(searchText ? {} : { default: true }),
  }

  const { data }: { data: SearchData<SearchResult> } = await apiClient.get(
    'search',
    {
      params,
    },
  )

  return { meta: data.meta as SearchMeta, data: data.data }
}
