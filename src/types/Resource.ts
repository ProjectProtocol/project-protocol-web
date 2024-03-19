type Resource = {
  id: number
  description: string
  name: string
  online: boolean
  email?: string
  state?: string
  street?: string
  city?: string
  zip?: string
  phone?: string
  url?: string
  tagList: string[]
  type: 'Resource'
}

export default Resource
