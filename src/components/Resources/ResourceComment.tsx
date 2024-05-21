import { Card } from 'react-bootstrap'
import Comment from 'src/types/Comment'
import formatDate from 'src/util/formatDate'

interface IResourceComment {
  comment: Comment
}

export default function ResourceComment({ comment }: IResourceComment) {
  return (
    <Card body>
      <p className="text-black text-end w-100">
        {formatDate(comment.createdAt)}
      </p>
      <p className="text-black" style={{ whiteSpace: 'pre' }}>
        {comment.body}
      </p>
    </Card>
  )
}
