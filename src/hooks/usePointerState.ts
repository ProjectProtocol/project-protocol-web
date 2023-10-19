import { PointerEvent, useState } from 'react'

// Utility hook for discerning if an element is pressed or hovered over
export default function usePointerState() {
  const [hover, setHover] = useState(false) // Mouse
  const [pressActive, setPressActive] = useState(false) // Touch

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => {
    if (pressActive) setPressActive(false)
    setHover(false)
  }

  const handlePress = (e: PointerEvent<HTMLDivElement>) => {
    setPressActive(true)
  }

  const clearPress = () => {
    setPressActive(false)
  }

  return {
    hover,
    pressActive,
    pointerHandlers: {
      onMouseEnter,
      onMouseLeave,
      onMouseDown: handlePress,
      onPointerMove: clearPress,
      onPointerDown: handlePress,
      onPointerUp: clearPress,
    },
  }
}
