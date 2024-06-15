interface ILinkedTextInToast {
  regularText: string
  linkedText: string
  setPage: () => void
}

export default function LinkedTextInToast({
  regularText,
  linkedText,
  setPage,
}: ILinkedTextInToast) {
  const text = `${regularText} `
  return (
    <div>
      {text}
      <a
        role="button"
        className="text-decoration-underline text-white"
        onClick={setPage}
      >
        {linkedText}
      </a>
    </div>
  )
}
