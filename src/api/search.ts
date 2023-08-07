import Agent from "../types/Agent"
import Office from "../types/Office"
import SearchMeta from "../types/SearchMeta"
import apiClient from "./client"

export type SearchData = {
  meta: SearchMeta
  data: (Agent | Office)[]
}

export async function search() {
  const { data }: { data: SearchData } = await apiClient.get("search", {
    params: { default: true },
  })

  return { meta: data.meta as SearchMeta, results: data.data }
}
