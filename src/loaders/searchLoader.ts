import { LoaderFunctionArgs } from 'react-router-dom'
import { ApiSearch } from 'src/api'

export interface SearchLoaderReturn {
  searchData: ApiSearch.SearchData
  searchParam: string
  getData: (page?: number) => Promise<ApiSearch.SearchData>
}

export default async function searchLoader({
  request,
}: LoaderFunctionArgs): Promise<SearchLoaderReturn> {
  const url = new URL(request.url)
  const searchParam = url.searchParams.get('search') || ''
  const getData = async (page: number = 0) => {
    const data = await ApiSearch.search({ searchText: searchParam, page })
    return data
  }
  const searchData = await getData()

  return { searchData, searchParam, getData }
}
