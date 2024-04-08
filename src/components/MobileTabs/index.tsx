import SearchIcon from './SearchIcon'
import MobileTabLink from './MobileTabLink'
import HomeIcon from './HomeIcon'
import ResourcesIcon from './ResourcesIcon'

export default function MobileTabs() {
  return (
    <div className="sticky-bottom bg-white p-3 shadow-lg d-md-none">
      <div className="d-flex flex-row justify-content-around">
        <MobileTabLink to="/" icon={<HomeIcon />} label="Resources" />
        <MobileTabLink to="/" icon={<SearchIcon />} label="Rate my PO" />
        <MobileTabLink
          to="/resources"
          icon={<ResourcesIcon />}
          label="Resources"
        />
      </div>
    </div>
  )
}
