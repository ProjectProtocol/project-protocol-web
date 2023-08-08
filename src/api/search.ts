import Agent from "../types/Agent"
import Office from "../types/Office"
import SearchMeta from "../types/SearchMeta"
import apiClient from "./client"

export type SearchData = {
  meta: SearchMeta
  data: (Agent | Office)[]
}

export async function search(searchText: string | null) {
  const params = searchText ? { search: searchText } : { default: true }
  const { data }: { data: SearchData } = await apiClient.get("search", {
    params,
  })

  return { meta: data.meta as SearchMeta, results: data.data }
}
