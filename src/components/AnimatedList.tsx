import { useSprings, animated } from '@react-spring/web'
import { Children, Fragment } from 'react'

interface IAnimatedList {
  children: React.ReactNode
  immediate?: boolean
  delay?: number
}

/**
 * Wraps any number of children in an animated container, animating them in sequence.
 */
export default function AnimatedList({
  children,
  immediate = false,
  delay = 150,
}: IAnimatedList) {
  const [springs] = useSprings(Children.count(children), (index: number) => ({
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    delay: immediate ? 0 : index * delay,
    easing: 'easeOutCubic',
    immediate,
  }))

  return (
    <Fragment>
      {Children.map(children, (child, index) => {
        return <animated.div style={springs[index]}>{child}</animated.div>
      })}
    </Fragment>
  )
}
