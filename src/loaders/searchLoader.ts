import { LoaderFunctionArgs } from 'react-router-dom'
import { SearchData, search } from '../api/search'

export interface SearchLoaderReturn {
  searchData: SearchData
  searchParam: string
}

export default async function searchLoader({
  request,
}: LoaderFunctionArgs): Promise<SearchLoaderReturn> {
  const url = new URL(request.url)
  const searchParam = url.searchParams.get('search') || ''
  const searchData = await search(searchParam)
  return { searchData, searchParam }
}
