import { Toaster } from 'react-hot-toast'
import useWindowSize from 'src/hooks/useWindowSize'

// Options: https://react-hot-toast.com/docs/toaster
export default function NotificationArea() {
  const [width] = useWindowSize()

  return (
    <Toaster
      position={width < 768 ? 'bottom-center' : 'top-center'}
      toastOptions={{
        className: 'text-white',
        style: {
          backgroundColor: 'rgba(0,0,0,0.85)',
        },
      }}
    />
  )
}
