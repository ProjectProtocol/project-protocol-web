import { RATING_COLORS, svgProps } from './svgProps'

interface IRatingsBadge {
  /** Integer or decimal rating. Can be between 0 and 5. */
  rating: number
}

/** Dynamic SVG component to display a rating or average rating score. */
export default function RatingsBadge({ rating }: IRatingsBadge) {
  const decimal = rating % 1 > 0 ? (rating % 1).toPrecision(1).slice(1) : null
  const integer = Math.floor(rating)
  const properties = svgProps
  const fill = RATING_COLORS[integer - 1] || '#C9C9C9'

  return (
    <svg {...properties.svg}>
      <path {...properties.path} fill={fill} />
      <text {...properties.text} fontWeight={700}>
        <tspan {...properties.integer}>{integer || '0'}</tspan>
        {decimal && <tspan {...properties.decimal}>{decimal}</tspan>}
      </text>
    </svg>
  )
}
