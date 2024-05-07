import React from "react";
import { Googlemap } from '../components/Googlemap';
import { GooglemapToolBar } from '../components/GooglemapToolBar';
import { GooglemapSubmitForm } from '../components/GooglemapSubmitForm';
import { GooglemapActionButton } from '../components/GooglemapActionButton';
import { UserButton } from '../components/UserButton';
import { FlowerGarden } from "../components/FlowerGarden";
import { UserInfo } from '../components/UserInfo';
import { useEffect, useState } from 'react';

// ログイン後にリダイレクトするための、ホームを実装します。ここでは特に何もしません。
const Home: React.FC = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isFlowerGardenOpen, setIsFlowerGardenOpen] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [MapClick, setMapClick] = useState(false);
  const [genre, setGenre] = useState('');
  const [SubmitFormOpen, setSubmitFormOpen] = useState(false);

  const handleFlowerGardenInfo = () => {
    setIsFlowerGardenOpen(!isFlowerGardenOpen);
  };

  const handleToggleUserInfo = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  const handleToggleSubmitForm = () => {
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGenre(e.target.value);
  };


  const nextformat = () => {
    if(!genre){
      setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
      return
    }
    setMapClick((MapClick) => (!MapClick))
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
  };

  const createMarker = (e: google.maps.MapMouseEvent) => {
    if (!MapClick){
      return;
    }
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (!lat || !lng) {
      return;
    }
    setMapClick((MapClick) => (!MapClick))
    const newPin: Pin = {
      genre: genre,
      latitude: String(lat),
			longitude: String(lng),
      id: new Date().getTime(),
			tag: [],
    };

    setPins((pins) => [newPin, ...pins]);
    setGenre('');
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
      <GooglemapToolBar 
        MapClick={MapClick} />
      <Googlemap 
        pins={pins}
        createMarker={createMarker}
      />
      <GooglemapSubmitForm
        genre={genre}
        SubmitFormOpen={SubmitFormOpen}
        onGenreChange={handleGenreChange}
        nextformat={nextformat}
        onToggleSubmitForm={handleToggleSubmitForm}
      />
      <GooglemapActionButton
				SubmitFormOpen={SubmitFormOpen}
				onToggleSubmitForm={handleToggleSubmitForm}
      />
      {isUserInfoOpen && <div onClick={handleCloseUserInfo} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />}
    </>
  );
};

export default Home;