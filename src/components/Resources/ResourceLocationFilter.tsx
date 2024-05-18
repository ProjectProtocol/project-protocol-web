import { useTranslate } from '@tolgee/react'
import { debounce } from 'lodash-es'
import { ChangeEvent } from 'react'
import { FormControl, FormSelect } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

export default function ResourceLocationFilter() {
  const [params, setParams] = useSearchParams()
  const { t } = useTranslate('resources')

  const location = params.get('location') || ''
  const distanceParam = params.get('distance') || '25'
  const distanceOptions = [5, 10, 15, 25, 50, 100].map((miles) => ({
    value: miles,
    label: t('locationFilter.miles', { count: miles }),
  }))

  const handleDistanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setParams(
      (prev: URLSearchParams) => {
        prev.set('distance', event.target.value)
        return prev
      },
      { replace: true },
    )
  }

  const handleLocationChange = debounce((event) => {
    setParams(
      (prev: URLSearchParams) => {
        if (!event.target.value) {
          prev.delete('location')
          prev.delete('distance')
        } else {
          prev.set('location', event.target.value)
          prev.set('distance', distanceParam)
        }
        return prev
      },
      { replace: true },
    )
  }, 500)

  return (
    <div>
      <h4>{t('locationFilter.title')}</h4>
      <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-center gap-2 mb-2">
        <span className="text-dark me-2 text-nowrap">
          {t('locationFilter.within')}
        </span>
        <FormSelect
          aria-label={t('locationFilter.distanceAccessibilityLabel')}
          size="lg"
          name="distance"
          className="w-auto"
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
        <span className="text-dark mx-2">{t('locationFilter.of')}</span>
        <FormControl
          name="location"
          aria-label={t('locationFilter.locationAccessibilityLabel')}
          defaultValue={location}
          onChange={handleLocationChange}
          placeholder={t('locationFilter.placeholder')}
          size="lg"
        />
      </div>
    </div>
  )
}
