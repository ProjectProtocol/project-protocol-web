/** Component wrappers around SVG icons for changing fill color to match the border */
export default function CloseIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Close">
        <path
          id="Path 787"
          d="M13.2769 11.2208L18.7215 5.77481C18.986 5.51022 19.1347 5.15132 19.1347 4.77713C19.1347 4.40295 18.986 4.04404 18.7215 3.77945C18.457 3.51487 18.0983 3.36621 17.7242 3.36621C17.3501 3.36621 16.9914 3.51487 16.7268 3.77945L11.2822 9.22437L5.83759 3.77945C5.57307 3.51487 5.21433 3.36621 4.84024 3.36621C4.46616 3.36621 4.10741 3.51487 3.8429 3.77945C3.57838 4.04404 3.42976 4.40295 3.42976 4.77713C3.42976 5.15132 3.57838 5.51022 3.8429 5.77481L9.28638 11.2208L3.8429 16.6669C3.57838 16.9314 3.42976 17.2901 3.42976 17.6643C3.42976 18.0384 3.57838 18.3974 3.8429 18.6619C4.10741 18.9265 4.46616 19.0752 4.84024 19.0752C5.21433 19.0752 5.57307 18.9265 5.83759 18.6619L11.2822 13.2159L16.7268 18.6619C16.9914 18.9265 17.3501 19.0752 17.7242 19.0752C18.0983 19.0752 18.457 18.9265 18.7215 18.6619C18.986 18.3974 19.1347 18.0384 19.1347 17.6643C19.1347 17.2901 18.986 16.9314 18.7215 16.6669L13.2769 11.2208Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}
