import { useSprings, animated, SpringValue } from '@react-spring/web'
import { Children, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'

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
        return <AnimatedListItem spring={springs[index]} child={child} />
      })}
    </Fragment>
  )
}

/**
 * Prevents the child from rendering until it's in view, and animates it in when it is.
 */
function AnimatedListItem({
  child,
  spring,
}: {
  child: React.ReactNode
  spring?: {
    opacity: SpringValue<number>
    transform: SpringValue<string>
  }
}) {
  const { ref, inView } = useInView()

  return (
    <animated.div ref={ref} style={inView ? spring : undefined}>
      {child}
    </animated.div>
  )
}
