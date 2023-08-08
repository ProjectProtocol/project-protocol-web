import { LoaderFunctionArgs } from "react-router-dom"
import { search } from "../api/search"

export default async function searchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchText = url.searchParams.get("search")
  const results = await search(searchText)
  return results
}
