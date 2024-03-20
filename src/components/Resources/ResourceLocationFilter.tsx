import { debounce } from 'lodash-es'
import { ChangeEvent } from 'react'
import { FormControl, FormSelect } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export default function ResourceLocationFilter() {
  const [params, setParams] = useSearchParams()
  const { t } = useTranslation()

  const location = params.get('location') || ''
  const distanceParam = params.get('distance') || '25'
  const distanceOptions = [
    { value: 5, label: '5 miles' },
    { value: 10, label: '10 miles' },
    { value: 25, label: '25 miles' },
    { value: 50, label: '50 miles' },
    { value: 100, label: '100 miles' },
  ]

  const handleDistanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setParams((prev: URLSearchParams) => {
      prev.set('distance', event.target.value)
      return prev
    })
  }

  const handleLocationChange = debounce((event) => {
    setParams((prev: URLSearchParams) => {
      if (!event.target.value) {
        prev.delete('location')
        prev.delete('distance')
      } else {
        prev.set('location', event.target.value)
        prev.set('distance', distanceParam)
      }
      return prev
    })
  }, 500)

  return (
    <div>
      <h4>{t('resources.locationFilter.title')}</h4>
      <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-center gap-2 mb-2">
        <span className="text-dark me-2">Within</span>
        <FormSelect
          aria-label="Default select example"
          size="lg"
          name="distance"
          defaultValue={distanceParam}
          onChange={handleDistanceChange}
        >
          {distanceOptions.map(
            (option: { value: number; label: string }, i: number) => (
              <option key={`distance-option-${i}`} value={option.value}>
                {option.label}
              </option>
            ),
          )}
        </FormSelect>
        <span className="text-dark mx-2">Of</span>
        <FormControl
          name="location"
          defaultValue={location}
          onChange={handleLocationChange}
          placeholder="City, State or Zip"
          size="lg"
        />
      </div>
    </div>
  )
}
