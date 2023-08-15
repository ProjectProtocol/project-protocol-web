import { RATING_COLORS, svgProps } from "./svgProps"

export default function RatingsBadge({ rating }: { rating: number }) {
  const decimal = rating % 1 > 0 ? (rating % 1).toPrecision(1).slice(1) : null
  const integer = Math.floor(rating)
  const properties = svgProps
  const fill = RATING_COLORS[integer - 1]

  return (
    <svg {...properties.svg}>
      <path {...properties.path} fill={fill} />
      <text {...properties.text} fontWeight={600}>
        <tspan {...properties.integer}>{integer || "0"}</tspan>
        {decimal && <tspan {...properties.decimal}>{decimal}</tspan>}
      </text>
    </svg>
  )
}
