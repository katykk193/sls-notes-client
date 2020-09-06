const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

export const fadeInLeft = {
  initial: {
    x: 60,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

export const fadeInRight = {
  initial: {
    x: -60,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

export const buttonHover = {
  hover: {
    scale: 1.1,
    textShadow: '0 0 8px rgb(255, 255, 255)',
    boxShadow: '0 0 8px rgb(255, 255, 255)',
    transition: {
      duration: 0.2,
      yoyo: 4
    }
  }
};

export const backdrop = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
};

export const modal = {
  initial: {
    y: '-100vh',
    opacity: 0
  },
  animate: {
    y: '0',
    opacity: 1,
    transition: { delay: 0.5 }
  }
};
