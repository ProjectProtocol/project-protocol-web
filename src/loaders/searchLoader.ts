import { LoaderFunctionArgs } from 'react-router-dom'
import { ApiSearch } from 'src/api'

export interface SearchLoaderReturn {
  searchData: ApiSearch.SearchData
  searchParam: string
}

export default async function searchLoader({
  request,
}: LoaderFunctionArgs): Promise<SearchLoaderReturn> {
  const url = new URL(request.url)
  const searchParam = url.searchParams.get('search') || ''
  const searchData = await ApiSearch.search({ searchText: searchParam })

  return { searchData, searchParam }
}
