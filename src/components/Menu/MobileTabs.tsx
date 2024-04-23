import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import SearchIcon from '../svg/SearchIcon'
import ResourcesIcon from '../svg/ResourcesIcon'
import HomeIcon from '../svg/HomeIcon'
import classNames from 'classnames'

function MobileTabItem({
  icon,
  label,
  to,
}: {
  icon: JSX.Element
  label: string
  to: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          'd-flex flex-column align-items-center text-decoration-none',
          {
            'text-primary': isActive,
          },
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

export default function MobileTabs() {
  return (
    <Navbar fixed="bottom" className="bg-white shadow shadow-lg d-md-none">
      <div className="d-flex justify-content-around align-items-center w-100 h-100 py-1">
        <MobileTabItem icon={<HomeIcon />} label="Home" to="/" />
        <MobileTabItem
          icon={<SearchIcon />}
          label="Rate my PO"
          to="rate-my-po"
        />
        <MobileTabItem
          icon={<ResourcesIcon />}
          label="Resources"
          to="resources"
        />
      </div>
    </Navbar>
  )
}
