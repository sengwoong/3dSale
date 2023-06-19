import React, { useRef } from 'react'
import { easing } from 'maath' // maath 모듈에서 easing을 가져옴
import { useFrame } from '@react-three/fiber' // @react-three/fiber에서 useFrame을 가져옴
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'; // @react-three/drei에서 AccumulativeShadows와 RandomizedLight를 가져옴

const Backdrop = () => {
  const shadows = useRef(); // shadows라는 ref를 생성

  return (
    <AccumulativeShadows
      ref={shadows} // shadows ref를 AccumulativeShadows 컴포넌트에 할당
      temporal // temporal 누적을 활성화하여 부드러운 그림자를 만듦
      frames={60} // temporal 누적에 사용되는 프레임 수
      alphaTest={0.85} // 그림자를 캐스팅하기 위한 알파 테스트 임계값
      scae={10} // 크기(scale)가 10인 그림자
      rotation={[Math.PI / 2, 0, 0]} // 그림자 지오메트리의 회전 설정
      position={[0, 0, -0.14]} // 그림자 지오메트리의 위치 설정
    >
      <RandomizedLight 
        amount={4} // 생성할 무작위 조명의 수
        radius={9} // 무작위 조명의 최대 반지름
        intensity={0.55} // 무작위 조명의 밝기
        ambient={0.25} // 무작위 조명의 주변 밝기
        position={[5, 5, -10]} // 무작위 조명의 위치
      />
      <RandomizedLight 
        amount={4} // 생성할 무작위 조명의 수
        radius={5} // 무작위 조명의 최대 반지름
        intensity={0.25} // 무작위 조명의 밝기
        ambient={0.55} // 무작위 조명의 주변 밝기
        position={[-5, 5, -9]} // 무작위 조명의 위치
      />
    </AccumulativeShadows>
  )
}

export default Backdrop;
