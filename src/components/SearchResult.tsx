import { Card } from 'react-bootstrap'
import Agent from '../types/Agent'
import { useNavigate } from 'react-router-dom'
import Office from '../types/Office'
import SearchResultAgent from './SearchResultAgent'
import SearchResultOffice from './SearchResultOffice'
import classNames from 'classnames'
import usePointerState from '../hooks/usePointerState'

interface SearchResultI {
  result: Agent | Office
}

// Needs a generic type
export default function SearchResult({ result }: SearchResultI) {
  const navigate = useNavigate()
  const { hover, pressActive, pointerHandlers } = usePointerState()

  const details =
    result.type === 'Agent' ? (
      <SearchResultAgent agent={result as Agent} />
    ) : (
      <SearchResultOffice office={result as Office} />
    )
  return (
    <Card
      body
      {...pointerHandlers}
      className={classNames('search-result mb-4 pe-auto border-0', {
        shadow: hover,
        'shadow-sm': !hover,
        'bg-secondary-subtle shadow-none': pressActive,
        'bg-white': !pressActive,
      })}
      style={{ transition: 'box-shadow 0.5s' }}
      role="button"
      onClick={() => navigate(`/agents/${result.id}`)}
    >
      {details}
    </Card>
  )
}
