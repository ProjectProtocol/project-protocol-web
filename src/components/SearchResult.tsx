import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchResultAgent from './SearchResultAgent'
import SearchResultOffice from './SearchResultOffice'
import ListItem from './List/ListItem'
import { CardProps } from 'react-bootstrap'

interface ISearchResult extends CardProps {
  result: Agent | Office
  onClick?: () => void
}

export default function SearchResult({
  result,
  onClick,
  ...cardProps
}: ISearchResult) {
  return (
    <ListItem onClick={onClick} body {...cardProps}>
      {result.type === 'Agent' ? (
        <SearchResultAgent agent={result as Agent} />
      ) : (
        <SearchResultOffice office={result as Office} />
      )}
    </ListItem>
  )
}
