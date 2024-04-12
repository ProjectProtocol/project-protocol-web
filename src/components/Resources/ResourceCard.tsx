import CategoryPill from './CategoryPill'
import { Button, Card } from 'react-bootstrap'
import Resource, { ResourceTag } from 'src/types/Resource'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import ResourceVoteControls from './ResourceVoteControls'
import { dislike, like } from 'src/api/resources'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from 'src/contexts/auth/AuthContext'
import toast from 'react-hot-toast'
import { LOGIN_PAGES } from '../LoginModal/constants'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'

interface IResourceCard {
  resource: Resource
  onUpdate: ({ resource }: { resource: Resource }) => void
}

export default function ResourceCard({ resource, onUpdate }: IResourceCard) {
  const { user } = useAuth()
  const { t } = useTranslation()
  const {
    url,
    name,
    description,
    tagList,
    street,
    city,
    state,
    zip,
    phone,
    email,
    isOnline,
  } = resource
  const { openLogin } = useLogin()
  const locationLabel = isOnline
    ? 'Online'
    : city && state
    ? `${city}, ${state}`
    : null

  const addressLabel = useMemo(() => {
    if (street && city && state && zip) {
      return [street, city, state, zip].join(', ')
    }
  }, [street, city, state, zip])

  const likeMutation = useMutation({
    mutationFn: () => like(resource.id),
    onSuccess: onUpdate,
  })

  const dislikeMutation = useMutation({
    mutationFn: () => dislike(resource.id),
    onSuccess: onUpdate,
  })

  function showUnauthorizedToast() {
    toast(
      (toastObject) => (
        <div>
          {t('resources.signInRequired')}
          <div className="d-flex py-2 flex-row justify-content-between align-items-center">
            <a
              role="button"
              className="link-light"
              onClick={() => toast.dismiss(toastObject.id)}
            >
              {t('ui.dismiss')}
            </a>
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                toast.dismiss(toastObject.id)
                openLogin(LOGIN_PAGES.SIGN_IN)
              }}
            >
              {t('account.login.login')}
            </Button>
          </div>
        </div>
      ),
      {
        id: 'unauthorized-toast',
      },
    )
  }

  return (
    <Card body>
      <div className="vertical-rhythm-sm">
        <div className="d-flex flex-row align-items-top">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2"
            style={{ width: '30px', height: '30px', padding: '6px' }}
          >
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
            />
          </div>
          <div className="flex flex-column">
            <a
              href={url}
              target="_blank"
              className="fs-3 fw-semibold d-block link-cobalt"
            >
              {name}
            </a>
            <div className="text-dark small text-break">{url}</div>
            {locationLabel && (
              <div className="d-flex flex-row">
                <i className="bi bi-geo-alt-fill me-1 text-dark small" />
                <span className="small">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>
        <p>{description}</p>
        <div className="d-flex flex-column gap-1">
          {addressLabel && (
            <a
              href={`https://maps.google.com/?q=${addressLabel}`}
              target="_blank"
            >
              {addressLabel}
            </a>
          )}
          {phone && <a href={`tel:+1${phone}`}>{phone}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
        </div>
        <div className="d-flex flex-row flex-wrap gap-2">
          {tagList.map((tag: ResourceTag, i: number) => (
            <CategoryPill
              key={`resource-${i}-${tag}`}
              active={true}
              label={t(`resources.tags.${tag}`)}
            />
          ))}
        </div>
        <ResourceVoteControls
          resource={resource}
          onLike={() => {
            if (user) {
              likeMutation.mutate()
            } else {
              showUnauthorizedToast()
            }
          }}
          onDislike={() => {
            if (user) {
              dislikeMutation.mutate()
            } else {
              showUnauthorizedToast()
            }
          }}
        />
      </div>
    </Card>
  )
}
