import { useState } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
import { ApiResources } from 'src/api'
import { IResourceCommentParams } from 'src/api/resources'
import AnimatedList from 'src/components/AnimatedList'
import Divider from 'src/components/Divider'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import PageHeader from 'src/components/PageHeader'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceComment from 'src/components/Resources/ResourceComment'
import SendIcon from 'src/components/svg/Send'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ResourceLoaderReturn } from 'src/loaders/resourceLoader'
import Comment from 'src/types/Comment'
import Resource from 'src/types/Resource'
import bootstrapVariables from 'src/util/bootstrapVariables'

export default function ResourceView() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { openLogin } = useLogin()
  const data = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(data.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }
  const [commentText, setCommentText] = useState('')
  const submitDisabled = commentText.length <= 0

  const onSubmit = async (data: IResourceCommentParams) => {
    const commentSuccess = await ApiResources.createComment(resource.id, data)

    if (commentSuccess) {
      console.log('success')
    } else {
      console.log('failure')
    }
  }

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
    <>
      <PageHeader title={''} showBack />
      <div className="vertical-rhythm">
        <ResourceCard resource={resource} onUpdate={onUpdateResource} />
        <Divider />
        <div className="vertical-rhythm-sm">
          {user ? (
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
                  onClick={() => onSubmit({ body: commentText })}
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
          ) : (
            <>
              <Button
                className="w-100"
                onClick={() => openLogin(LOGIN_PAGES.SIGN_UP)}
              >
                {t('resources.comments.signUpToLeaveComment')}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}
                >
                  {t('resources.comments.orLogIn')}
                </Button>
              </div>
            </>
          )}

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
    </>
  )
}
