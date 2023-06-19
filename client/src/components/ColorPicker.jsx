import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = () => {
  // Valtio의 useSnapshot을 사용하여 상태의 스냅샷을 가져옵니다.
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      {/* SketchPicker 컴포넌트를 사용하여 색상 선택기를 렌더링합니다. */}
      <SketchPicker 
        color={snap.color} // snap에서 현재 색상을 가져와 초기값으로 설정합니다.
        disableAlpha // 알파 채널을 비활성화합니다.
        onChange={(color) => state.color = color.hex} // 색상이 변경되면 상태에 새로운 색상 값을 할당합니다.
      />
    </div>
  )
}

export default ColorPicker
