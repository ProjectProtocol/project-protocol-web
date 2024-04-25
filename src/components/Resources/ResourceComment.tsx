import { Card } from 'react-bootstrap'
import Comment from 'src/types/Comment'

interface IResourceComment {
  comment: Comment
}

export default function ResourceComment({ comment }: IResourceComment) {
  return (
    <Card body>
      <p>{comment.body}</p>
    </Card>
  )
}
