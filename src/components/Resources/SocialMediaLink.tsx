interface ISocialMediaLink {
  platform: string
  value: string
}

export default function SocialMediaLink({ platform, value }: ISocialMediaLink) {
  const cleanedValue = value.replace(`https://www.${platform}.com/`, '')
  return (
    <div className="d-flex flex-row gap-1">
      <i className={`bi bi-${platform}`}></i>
      <a
        href={`https://www.${platform}.com/${cleanedValue}`}
        className="text-decoration-none"
        target="_blank"
      >
        {cleanedValue}
      </a>
    </div>
  )
}
