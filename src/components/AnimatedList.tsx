import { useSprings, animated } from '@react-spring/web'
import { Children, Fragment } from 'react'

interface IAnimatedList {
  children: React.ReactNode
  immediate?: boolean
}

export default function AnimatedList({
  children,
  immediate = false,
}: IAnimatedList) {
  const [springs] = useSprings(Children.count(children), (index: number) => ({
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    delay: immediate ? 0 : index * 150,
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
