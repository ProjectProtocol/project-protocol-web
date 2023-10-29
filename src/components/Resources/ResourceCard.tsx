import { ChainModifiers, Entry } from 'contentful'
import ListItem from '../List/ListItem'
import Card from 'react-bootstrap/Card'
import {
  ResourceCategoryType,
  ResourceLinkSkeleton,
} from 'src/types/contentful-types'
import { useEffect, useState } from 'react'
import apiClient from 'src/api/client'
import icon from '../../images/icon.svg'
import { ResourceMetaData } from 'src/types/ResourceMetaData'
import CategoryPill from './CategoryPill'
import { Badge, Spinner } from 'react-bootstrap'

export default function ResourceCard({
  resource,
}: {
  resource: Entry<ResourceLinkSkeleton, ChainModifiers, string>
  index: number
}) {
  const url = resource.fields.url as string
  const title = resource.fields.title as string
  const organization = resource.fields.organization as string
  const category = (
    resource.fields.category as string[]
  )[0] as ResourceCategoryType

  return (
    <div>
      <a href={url} target="_blank" className="text-decoration-none link-dark">
        <div className="d-flex flex-row align-items-center mb-2">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2"
            style={{ width: '30px', height: '30px', padding: '6px' }}
          >
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
              width="100%"
            />
          </div>
          <div className="lh-sm">
            <div>
              <small>{url}</small>
            </div>
          </div>
        </div>
      </a>
      <h3>
        <a href={url} className="link-brand" target="_blank">
          {title}
        </a>
      </h3>
      <p className="text-tertiary">{organization}</p>
      <CategoryPill active={false} label={category} />
    </div>
  )
}
