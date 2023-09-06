import Card, { CardProps } from 'react-bootstrap/Card'
import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchResultAgent from './SearchResultAgent'
import SearchResultOffice from './SearchResultOffice'
import classNames from 'classnames'
import usePointerState from '../hooks/usePointerState'

interface ISearchResult extends CardProps {
  result: Agent | Office
  onClick?: () => void
}

export default function SearchResult({ result, onClick }: ISearchResult) {
  const { hover, pressActive, pointerHandlers } = usePointerState()

  return (
    <Card
      body
      {...pointerHandlers}
      className={classNames('search-result mb-4 pe-auto border-0', {
        shadow: hover,
        'shadow-sm': !hover,
        'bg-tertiary-subtle shadow-none': pressActive,
        'bg-white': !pressActive,
      })}
      style={{ transition: 'box-shadow 0.5s' }}
      onClick={onClick}
      role={onClick ? 'button' : ''}
    >
      {result.type === 'Agent' ? (
        <SearchResultAgent agent={result as Agent} />
      ) : (
        <SearchResultOffice office={result as Office} />
      )}
    </Card>
  )
}
