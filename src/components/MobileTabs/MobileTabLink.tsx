import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export default function MobileTabLink({
  icon,
  label,
  to,
}: {
  icon: ReactNode
  label: string
  to: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const color = isActive ? 'text-primary' : 'text-dark'
        return `nav-link ${color}`
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        {icon}
        {label}
      </div>
    </NavLink>
  )
}
