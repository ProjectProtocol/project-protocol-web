import * as React from "react"

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

interface IUseAddToHomeScreenPromptReturn {
  prompt?: IBeforeInstallPromptEvent
  showInstallPrompt: () => void
  isInstallable: boolean
}

export function useAddToHomescreenPrompt(): IUseAddToHomeScreenPromptReturn {
  const [prompt, setPrompt] = React.useState<IBeforeInstallPromptEvent>()

  const showInstallPrompt = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    )
  }

  const isInstallable = !!prompt

  React.useEffect(() => {
    const ready: EventListenerOrEventListenerObject = (e: Event) => {
      e.preventDefault()
      setPrompt(e as IBeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", ready)

    return () => {
      window.removeEventListener("beforeinstallprompt", ready)
    }
  }, [])

  return { prompt, showInstallPrompt, isInstallable }
}
