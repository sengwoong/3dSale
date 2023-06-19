export const transition = { type: "spring", duration: 0.8 };

// 슬라이드 애니메이션을 생성하는 함수입니다. direction 매개변수에 따라 애니메이션의 초기값, 애니메이션 중간값, 애니메이션 종료값을 설정합니다.
export const slideAnimation = (direction) => {
  return {
    initial: {
      // direction 값에 따라 x, y 좌표 및 투명도를 설정합니다.
      // direction이 "left"이면 x 좌표는 -100, "right"이면 x 좌표는 100, 그렇지 않으면 x 좌표는 0으로 설정합니다.
      // direction이 "up"이면 y 좌표는 100, "down"이면 y 좌표는 -100, 그렇지 않으면 y 좌표는 0으로 설정합니다.
      // 투명도는 0으로 설정합니다.
      // transition 속성에는 전역적으로 정의된 transition을 사용하며, delay 속성은 0.5초로 설정됩니다.
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 }, // 전역적인 transition을 사용하며, 0.5초 후에 시작합니다.
    },
    animate: {
      // x, y 좌표 및 투명도를 애니메이션 중간값으로 설정합니다.
      // transition 속성에는 전역적인 transition을 사용하며, delay 속성은 0으로 설정됩니다.
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 }, // 전역적인 transition을 사용하며, 지연 없이 시작합니다.
    },
    exit: {
      // direction 값에 따라 x, y 좌표를 설정합니다.
      // direction이 "left"이면 x 좌표는 -100, "right"이면 x 좌표는 100, 그렇지 않으면 x 좌표는 0으로 설정합니다.
      // direction이 "up"이면 y 좌표는 100, "down"이면 y 좌표는 -100, 그렇지 않으면 y 좌표는 0으로 설정합니다.
      // transition 속성에는 전역적인 transition을 사용하며, 지연 없이 시작합니다.
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 }, // 전역적인 transition을 사용하며, 지연 없이 시작합니다.
    },
  };
};

export const fadeAnimation = {
  initial: {
    // 투명도를 0으로 설정합니다

    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
};

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};
