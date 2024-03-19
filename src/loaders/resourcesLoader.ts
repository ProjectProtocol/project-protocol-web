import { LoaderFunctionArgs } from 'react-router-dom'
export type ResourcesLoaderReturn = {
  categoryParam: string[]
}

export default async function ({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const categoryParam = url.searchParams.getAll('category')

  return {
    categoryParam,
  }
}
