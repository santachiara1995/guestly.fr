function shouldReduceMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const structuralEase = [0.16, 1, 0.3, 1]

function safeTransition(transition) {
  return shouldReduceMotion()
    ? {
        duration: 0,
        delay: 0
      }
    : transition
}

function toEnterState(target) {
  return shouldReduceMotion()
    ? {
        ...target,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: safeTransition(target.transition ?? {})
      }
    : target
}

function structuralTransition(duration, delay = 0) {
  return safeTransition({
    duration,
    delay,
    ease: structuralEase
  })
}

export const motionVariants = {
  page: {
    initial: { opacity: 0, y: 8 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: structuralTransition(180)
    })
  },
  block: {
    initial: { opacity: 0, y: 6 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: structuralTransition(180)
    })
  },
  revealLeft: {
    initial: { opacity: 0, x: -8 },
    enter: toEnterState({
      opacity: 1,
      x: 0,
      transition: structuralTransition(180)
    })
  },
  revealRight: {
    initial: { opacity: 0, x: 8 },
    enter: toEnterState({
      opacity: 1,
      x: 0,
      transition: structuralTransition(180)
    })
  },
  scaleIn: {
    initial: { opacity: 0, y: 4 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: structuralTransition(160)
    })
  },
  pop: {
    initial: { opacity: 0, y: 4 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: structuralTransition(160)
    })
  }
}

export function staggerEnter(index, step = 56, baseDelay = 24) {
  return toEnterState({
    opacity: 1,
    y: 0,
    transition: structuralTransition(180, baseDelay + index * step)
  })
}
