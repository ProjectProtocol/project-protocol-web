export type ResourceLink = {
  fields: {
    category: string[]
    location: string
    organization: string
    title: string
    url: string
  }
}

export interface ResourceLinkEntrySkeleton extends ResourceLink {
  contentTypeId: 'resourceLink'
}
