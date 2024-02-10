import { LoaderFunctionArgs } from 'react-router-dom'
import { ApiOffice } from 'src/api'
import Office from 'src/types/Office'

export type OfficeLoaderReturn = {
  office: Office
}

export default async function officeLoader({
  params,
}: LoaderFunctionArgs): Promise<OfficeLoaderReturn> {
  const officeId = params.officeId as string
  const office = await ApiOffice.get(officeId)

  return {
    office,
  }
}
