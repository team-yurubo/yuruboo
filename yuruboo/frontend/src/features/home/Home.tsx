import React from "react";
import { Googlemap } from '../components/Googlemap';
import { UserButton } from '../components/UserButton';
import { FlowerGarden } from "../components/FlowerGarden";
import { UserInfo } from '../components/UserInfo';
import { useEffect, useState } from 'react';

// ログイン後にリダイレクトするための、ホームを実装します。ここでは特に何もしません。
const Home: React.FC = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isFlowerGardenOpen, setIsFlowerGardenOpen] = useState(false);

  const handleFlowerGardenInfo = () => {
    setIsFlowerGardenOpen(!isFlowerGardenOpen);
  };

  const handleToggleUserInfo = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  return(
    <>
      <UserButton onToggleUserInfo={handleToggleUserInfo} />
      <UserInfo
        isOpen={isUserInfoOpen}
        onClose={handleCloseUserInfo}
        onToggleFlowerGarden={handleFlowerGardenInfo}
      />
      <FlowerGarden
        isOpen={isFlowerGardenOpen}
        onToggleFlowerGarden={handleFlowerGardenInfo}
      />
      <Googlemap />
      {isUserInfoOpen && <div onClick={handleCloseUserInfo} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />}
    </>
  );
};

export default Home;