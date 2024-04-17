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
    const updatedResource = updatedResourceData.resource
    const newResource = { ...resource, ...updatedResource }

    setResource(newResource)
  }

  return (
    <div className="vertical-rhythm">
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        {t('ui.back')}
      </a>
      <ResourceCard resource={resource} onUpdate={onUpdateResource} />
    </div>
  )
}
