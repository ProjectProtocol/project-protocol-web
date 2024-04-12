import { LoaderFunctionArgs } from 'react-router-dom'
import { ApiResources } from 'src/api'
import Resource from 'src/types/Resource'

export type ResourceLoaderReturn = {
  resource: Resource
}

export default async function resourceLoader({
  params,
}: LoaderFunctionArgs): Promise<ResourceLoaderReturn> {
  const resourceId = params.resourceId as string
  const resource = await ApiResources.get(resourceId)

  return {
    resource,
  }
}
