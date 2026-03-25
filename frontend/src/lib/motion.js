function shouldReduceMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const springEase = [0.22, 1, 0.36, 1]

function safeTransition(transition) {
  if (!shouldReduceMotion()) {
    return transition
  }

  return {
    ...transition,
    duration: 0,
    delay: 0
  }
}

function toEnterState(target) {
  if (!shouldReduceMotion()) {
    return target
  }

  return {
    ...target,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: safeTransition(target.transition ?? {})
  }
}

export const motionVariants = {
  page: {
    initial: { opacity: 0, y: 16 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: safeTransition({ duration: 320, ease: springEase })
    })
  },
  block: {
    initial: { opacity: 0, y: 12 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      transition: safeTransition({ duration: 280, ease: springEase })
    })
  },
  revealLeft: {
    initial: { opacity: 0, x: -28 },
    enter: toEnterState({
      opacity: 1,
      x: 0,
      transition: safeTransition({ duration: 450, ease: springEase })
    })
  },
  revealRight: {
    initial: { opacity: 0, x: 28 },
    enter: toEnterState({
      opacity: 1,
      x: 0,
      transition: safeTransition({ duration: 450, ease: springEase })
    })
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.98 },
    enter: toEnterState({
      opacity: 1,
      scale: 1,
      transition: safeTransition({ duration: 260, ease: springEase })
    })
  },
  pop: {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    enter: toEnterState({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: safeTransition({ duration: 280, ease: springEase })
    })
  }
}

export function staggerEnter(index, step = 90, baseDelay = 80) {
  return toEnterState({
    opacity: 1,
    y: 0,
    transition: safeTransition({
      duration: 300,
      ease: springEase,
      delay: baseDelay + index * step
    })
  })
}
