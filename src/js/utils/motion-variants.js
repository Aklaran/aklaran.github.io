export const fadeVariant = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
}

export const landingContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 1,
      staggerChildren: 0.4,
    },
  },
}

export const landingItemVariant = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export const headerLogoVariant = {
  hidden: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.4,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
}
