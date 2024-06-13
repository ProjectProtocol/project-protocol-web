interface ILinkedTextInToast {
  regularText: string
  linkedText: string
  loginPage: number
  setPage: (p: number) => void
}

export default function LinkedTextInToast({
  regularText,
  linkedText,
  loginPage,
  setPage,
}: ILinkedTextInToast) {
  const text = `${regularText} `
  return (
    <div>
      {text}
      <a role="button" className="errorLink" onClick={() => setPage(loginPage)}>
        {linkedText}
      </a>
    </div>
  )
}
