import { useState } from 'react'
import { Card, FormControl } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useNavigate } from 'react-router-dom'
import AnimatedList from 'src/components/AnimatedList'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceComment from 'src/components/Resources/ResourceComment'
import { ResourceLoaderReturn } from 'src/loaders/resourceLoader'
import Comment from 'src/types/Comment'
import Resource from 'src/types/Resource'

export default function ResourceView() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const data = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(data.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }

  const dummyComments: Comment[] = [
    {
      body: 'This is a comment',
      status: 'published',
      type: 'Comment',
    },
    {
      body: 'This is another comment',
      status: 'published',
      type: 'Comment',
    },
  ]

  return (
    <div className="vertical-rhythm">
      <div>
        <a role="button" onClick={() => navigate(-1)}>
          <i className="bi bi-chevron-left align-middle" />
          {t('ui.back')}
        </a>
      </div>
      <ResourceCard resource={resource} onUpdate={onUpdateResource} />
      <hr style={{ borderTopWidth: '3px' }} />
      <div className="vertical-rhythm-sm">
        <Card body>
          <form
            onSubmit={() => {
            }}
          >
            <FormControl
              className="resource-comment"
              as="textarea"
              placeholder={t('comment.add')}
              rows={1}
            />
          </form>
        </Card>
        <AnimatedList>
          {dummyComments.map((comment, index) => (
            <ResourceComment
              comment={comment}
              key={`resource-comment-${index}`}
            />
          ))}
        </AnimatedList>
      </div>
    </div>
  )
}
