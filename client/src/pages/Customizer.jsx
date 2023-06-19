import React, { useState, useEffect } from 'react'; // React와 useState, useEffect를 임포트합니다.
import { AnimatePresence, motion } from 'framer-motion'; // AnimatePresence와 motion을 framer-motion에서 임포트합니다.
import { useSnapshot } from 'valtio'; // useSnapshot을 valtio에서 임포트합니다.

import config from '../config/config'; // config 파일을 임포트합니다.
import state from '../store'; // store를 임포트합니다.
import { download } from '../assets'; // assets에서 download를 임포트합니다.
import { downloadCanvasToImage, reader } from '../config/helpers'; // helpers에서 downloadCanvasToImage와 reader를 임포트합니다.
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'; // constants에서 EditorTabs, FilterTabs, DecalTypes를 임포트합니다.
import { fadeAnimation, slideAnimation } from '../config/motion'; // motion에서 fadeAnimation과 slideAnimation을 임포트합니다.
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'; // components에서 AIPicker, ColorPicker, CustomButton, FilePicker, Tab을 임포트합니다.

const Customizer = () => {
  const snap = useSnapshot(state); // Valtio 상태의 스냅샷을 가져옵니다.

  const [file, setFile] = useState(''); // file과 setFile을 useState를 사용하여 상태로 관리합니다.

  const [prompt, setPrompt] = useState(''); // prompt와 setPrompt를 useState를 사용하여 상태로 관리합니다.
  const [generatingImg, setGeneratingImg] = useState(false); // generatingImg와 setGeneratingImg를 useState를 사용하여 상태로 관리합니다.

  const [activeEditorTab, setActiveEditorTab] = useState(''); // activeEditorTab과 setActiveEditorTab을 useState를 사용하여 상태로 관리합니다.
  const [activeFilterTab, setActiveFilterTab] = useState({ // activeFilterTab과 setActiveFilterTab을 useState를 사용하여 상태로 관리합니다.
    logoShirt: true, // logoShirt의 초기값을 true로 설정합니다.
    stylishShirt: false, // stylishShirt의 초기값을 false로 설정합니다.
  });

  // activeTab에 따라 해당하는 탭 콘텐츠를 표시합니다.
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />; // ColorPicker 컴포넌트를 반환합니다.
      case 'filepicker':
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        ); // FilePicker 컴포넌트를 반환하며, file, setFile, readFile을 props로 전달합니다.
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        ); // AIPicker 컴포넌트를 반환하며, prompt, setPrompt, generatingImg, handleSubmit을 props로 전달합니다.
      default:
        return null;
    }
  };

  // 이미지 생성을 처리하는 함수입니다.
  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt'); // prompt가 비어있는 경우 경고 메시지를 표시하고 함수를 종료합니다.

    try {
      setGeneratingImg(true); // generatingImg 상태를 true로 설정하여 이미지 생성 중임을 나타냅니다.

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST', // POST 요청을 보냅니다.
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }), // prompt를 요청의 본문으로 전달합니다.
      });

      const data = await response.json(); // 응답을 JSON 형식으로 파싱합니다.

      handleDecals(type, `data:image/png;base64,${data.photo}`); // handleDecals 함수를 호출하여 결과 이미지를 처리합니다.
    } catch (error) {
      alert(error); // 에러가 발생한 경우 경고 메시지를 표시합니다.
    } finally {
      setGeneratingImg(false); // generatingImg 상태를 false로 설정하여 이미지 생성이 완료되었음을 나타냅니다.
      setActiveEditorTab(''); // activeEditorTab 상태를 초기화합니다.
    }
  };




  
  // 데칼을 처리하는 함수입니다.
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]; // DecalTypes에서 해당하는 데칼 유형을 찾습니다.

    state[decalType.stateProperty] = result; // state의 해당 데칼 상태 속성에 결과를 할당합니다.

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab); // activeFilterTab의 해당 데칼 필터 탭이 활성화되지 않은 경우 handleActiveFilterTab 함수를 호출합니다.
    }
  };

  // 활성화된 필터 탭을 처리하는 함수입니다.
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]; // isLogoTexture 상태를 반전시킵니다.
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]; // isFullTexture 상태를 반전시킵니다.
        break;
      default:
        state.isLogoTexture = true; // isLogoTexture 상태를 true로 설정합니다.
        state.isFullTexture = false; // isFullTexture 상태를 false로 설정합니다.
        break;
    }

    // 상태를 설정한 후에 activeFilterTab을 업데이트합니다.
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName], // 해당 필터 탭의 활성화 여부를 반전시킵니다.
      };
    });
  };

  // 파일을 읽어오는 함수입니다.
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result); // handleDecals 함수를 호출하여 결과를 처리합니다.
      setActiveEditorTab(''); // activeEditorTab 상태를 초기화합니다.
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer; // Customizer 컴포넌트를 내보냅니다.
