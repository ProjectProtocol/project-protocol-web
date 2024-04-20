import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useNavigate } from 'react-router-dom'
import ResourceCard from 'src/components/Resources/ResourceCard'
import { ResourceLoaderReturn } from 'src/loaders/resourceLoader'
import Resource from 'src/types/Resource'

export default function ResourceView() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const data = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(data.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }

  return (
    <div className="vertical-rhythm">
      <div>
        <a role="button" onClick={() => navigate(-1)}>
          <i className="bi bi-chevron-left align-middle" />
          {t('ui.back')}
        </a>
      </div>
      <ResourceCard resource={resource} onUpdate={onUpdateResource} />
    </div>
  )
}
