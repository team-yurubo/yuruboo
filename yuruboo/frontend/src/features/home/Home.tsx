import React from "react";
import { Googlemap } from '../map/Googlemap';

// ログイン後にリダイレクトするための、ホームを実装します。ここでは特に何もしません。
const Home: React.FC = () => {
  return(
    <>
      <Googlemap />
    </>
  );
};

export default Home;