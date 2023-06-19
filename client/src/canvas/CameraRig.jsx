import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

/**
 * CameraRig은 카메라와 모델의 위치 및 회전을 제어하는 React 컴포넌트입니다.
 * 속성:
 * - children: 자식 요소입니다.
 */
const CameraRig = ({ children }) => {
  const group = useRef(); // 모델의 위치와 회전을 적용할 useRef 객체입니다.
  const snap = useSnapshot(state); // state 객체의 스냅샷을 사용합니다.

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260; // 현재 뷰포트 너비가 1260px 이하인지 확인하는 변수입니다.
    const isMobile = window.innerWidth <= 600; // 현재 뷰포트 너비가 600px 이하인지 확인하는 변수입니다.

 
 // 모델의 초기 위치 설정
let targetPosition = [-0.4, 0, 2];
if (snap.intro) {
  // 'snap.intro' 값이 true인 경우
  if (isBreakpoint) targetPosition = [0, 0, 2]; // 'isBreakpoint'이 true인 경우, 위치를 [0, 0, 2]로 설정합니다.
  if (isMobile) targetPosition = [0, 0.2, 2.5]; // 'isMobile'이 true인 경우, 위치를 [0, 0.2, 2.5]로 설정합니다.
} else {
  // 'snap.intro' 값이 false인 경우
  if (isMobile) targetPosition = [0, 0, 2.5]; // 'isMobile'이 true인 경우, 위치를 [0, 0, 2.5]로 설정합니다.
  else targetPosition = [0, 0, 2]; // 그 외의 경우, 위치를 [0, 0, 2]로 설정합니다.
}


    // 모델 카메라 위치 설정
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // 모델 회전 부드럽게 설정
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
