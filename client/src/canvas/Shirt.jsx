import React from 'react'
import { easing } from 'maath'; // maath 모듈에서 easing을 가져옴
import { useSnapshot } from 'valtio'; // valtio에서 useSnapshot을 가져옴
import { useFrame } from '@react-three/fiber'; // @react-three/fiber에서 useFrame을 가져옴
import { Decal, useGLTF, useTexture } from '@react-three/drei'; // @react-three/drei에서 Decal, useGLTF, useTexture를 가져옴

import state from '../store'; // '../store'에서 상태(state)를 가져옴

const Shirt = () => {
  const snap = useSnapshot(state); // state를 스냅샷으로 사용

  // GLTF 파일에서 노드(nodes)와 재질(materials)을 가져옴
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // 로고 텍스처와 전체 텍스처를 가져옴
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // 프레임 갱신마다 컬러(color)를 스냅샷의 컬러 값으로 부드럽게 변경
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group>
          <mesh
        castShadow  // 그림자를 생성할 수 있도록 설정
        geometry={nodes.T_Shirt_male.geometry} // 객체의 기하학적 정보를 지정
        material={materials.lambert1} // 객체의 재질을 지정
        material-roughness={1} // 재질의 거칠기(roughness) 값을 지정
        dispose={null} // Three.js에서 메모리 관리를 위해 사용되는 객체를 제거하지 않도록 설정
      >
        {/* isFullTexture이 true인 경우, 전체 텍스처를 Decal로 추가 */}
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]} // Decal의 위치
            rotation={[0, 0, 0]} // Decal의 회전
            scale={1} // Decal의 크기
            map={fullTexture} // Decal에 사용할 텍스처
          />
        )}
        {/* 
        /**
 * DecalProps는 meshStandardMaterial의 JSX 기본 속성(children 제외)에서 사용 가능한 속성들과 다음과 같은 추가 속성들로 구성됩니다.
 * - debug: 디버그 모드 여부를 나타내는 boolean 값입니다.
 * - mesh: Decal을 적용할 THREE.Mesh 요소에 대한 뮤타블 참조입니다.
 * - position: Decal의 위치를 나타내는 FIBER.Vector3입니다.
 * - rotation: Decal의 회전을 나타내는 FIBER.Euler 또는 number 값입니다.
 * - scale: Decal의 크기를 나타내는 FIBER.Vector3입니다.
 * - map: Decal에 사용할 THREE.Texture입니다.
 * - children: 자식 요소입니다.
 */ 
 }

        {/* isLogoTexture가 true인 경우, 로고 텍스처를 Decal로 추가 */}
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]} // Decal의 위치
            rotation={[0, 0, 0]} // Decal의 회전
            scale={0.15} // Decal의 크기
            map={logoTexture} // Decal에 사용할 텍스처
            map-anisotropy={16} // 텍스처의 anisotropy 값
            depthTest={false} // 깊이 테스트 사용 여부
            depthWrite={true} // 깊이 쓰기 사용 여부
          />
        )}
      </mesh>
    </group>

  )
}

export default Shirt
