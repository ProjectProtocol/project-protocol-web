import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchResultAgent from './SearchResultAgent'
import SearchResultOffice from './SearchResultOffice'
import ListItem from './List/ListItem'

interface ISearchResult {
  result: Agent | Office
  onClick?: () => void
}

export default function SearchResult({ result, onClick }: ISearchResult) {
  return (
    <ListItem onClick={onClick} body>
      {result.type === 'Agent' ? (
        <SearchResultAgent agent={result as Agent} />
      ) : (
        <SearchResultOffice office={result as Office} />
      )}
    </ListItem>
  )
}
