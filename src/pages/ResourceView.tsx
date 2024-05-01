import classNames from 'classnames'
import { useState } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useNavigate } from 'react-router-dom'
import AnimatedList from 'src/components/AnimatedList'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceComment from 'src/components/Resources/ResourceComment'
import SendIcon from 'src/components/svg/Send'
import { ResourceLoaderReturn } from 'src/loaders/resourceLoader'
import Comment from 'src/types/Comment'
import Resource from 'src/types/Resource'
import bootstrapVariables from 'src/util/bootstrapVariables'

export default function ResourceView() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const data = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(data.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }
  const [commentText, setCommentText] = useState('')
  const submitDisabled = commentText.length <= 0

  const dummyComments: Comment[] = [
    {
      body: 'This is a comment',
      status: 'published',
      date: 'Jun 26nd, 2024',
      type: 'Comment',
    },
    {
      body: 'This is another comment',
      status: 'published',
      date: 'Jun 27nd, 2024',
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
          <div className="position-relative">
            <FormControl
              className="bg-light border-0 shadow-none"
              as="textarea"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t('resources.comments.add')}
              rows={1}
            />
            <Button
              variant="link"
              className="p-0 text-dark position-absolute d-flex align-items-center"
              style={{
                right: '1rem',
                bottom: '0',
                height: '38px',
              }}
              disabled={submitDisabled}
              onClick={() => {}}
            >
              <SendIcon
                fill={
                  submitDisabled
                    ? bootstrapVariables['mediumGray']
                    : bootstrapVariables['cobalt']
                }
              />
            </Button>
          </div>
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
