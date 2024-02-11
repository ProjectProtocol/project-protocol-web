import { useEffect } from 'react'
import loadingBar from 'src/util/loadingBar'

export default function useLoadingBar(show: boolean) {
  useEffect(() => {
    if (show) {
      loadingBar.show()
    } else {
      loadingBar.hide()
    }
  }, [show])
}
