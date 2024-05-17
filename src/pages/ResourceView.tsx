import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslate } from '@tolgee/react'
import { useEffect, useState } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { InView } from 'react-intersection-observer'
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
import Resource from 'src/types/Resource'
import bootstrapVariables from 'src/util/bootstrapVariables'

export default function ResourceView() {
  const { t } = useTranslate()
  const { user } = useAuth()
  const { openLogin } = useLogin()
  const resourceData = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(resourceData.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }
  const queryClient = useQueryClient()

  const [commentText, setCommentText] = useState('')

  const [submitDisabled, setSubmitDisabled] = useState(false)

  useEffect(() => setSubmitDisabled(commentText == ''), [commentText])

  const onSubmit = async (data: IResourceCommentParams) => {
    setSubmitDisabled(true)
    const commentSuccess = await ApiResources.createComment(resource.id, data)

    if (commentSuccess) {
      toast.success(t('resources.comments.createdSuccess'))
      setCommentText('')
      queryClient.invalidateQueries({
        queryKey: ['resourceComments', resource.id],
      })
    } else {
      toast.error(t('error.generic'))
    }

    setSubmitDisabled(false)
  }

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['resourceComments', resource.id],
    queryFn: async ({ pageParam = 0 }) =>
      await ApiResources.listComments(resource.id, { page: pageParam }),
    getNextPageParam: ({ meta }) =>
      meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
    initialPageParam: 0,
  })

  const queryData = data || { pages: [] }

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
            <div className="d-flex flex-column align-items-center gap-3">
              <Button
                className="w-100 w-md-auto"
                onClick={() => openLogin(LOGIN_PAGES.SIGN_UP)}
              >
                {t('resources.comments.signUpToLeaveComment')}
              </Button>

              <Button
                variant="link"
                onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}
              >
                {t('resources.comments.orLogIn')}
              </Button>
            </div>
          )}
          <div className="vertical-rhythm pt-3">
            {queryData.pages.map((p, i) => {
              const lastPage = i == queryData.pages.length - 1
              return (
                <AnimatedList
                  key={`comments-page-${resource.id}-${i}`}
                  immediate={!lastPage}
                  delay={75}
                >
                  {p.data.map((item, index) => (
                    <ResourceComment
                      comment={item}
                      key={`comments-page-${resource.id}-${i}-${index}`}
                    />
                  ))}
                </AnimatedList>
              )
            })}
            <InView
              as="div"
              data-testid="observation-target"
              onChange={(inView) =>
                inView && hasNextPage && !isFetching && fetchNextPage()
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
