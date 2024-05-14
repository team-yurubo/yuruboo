import React from "react";
import { Googlemap } from '../components/Googlemap';
import { GooglemapToolBar } from '../components/GooglemapToolBar';
import { GooglemapSubmitForm } from '../components/GooglemapSubmitForm';
import { GooglemapActionButton } from '../components/GooglemapActionButton';
import { UserButton } from '../components/UserButton';
import { FlowerGarden } from "../components/FlowerGarden";
import { UserInfo } from '../components/UserInfo';
import { useState } from 'react';
import { useAuthContext } from "../auth/AuthContext"

// ログイン後にリダイレクトするための、ホームを実装します。ここでは特に何もしません。
const Home: React.FC = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isFlowerGardenOpen, setIsFlowerGardenOpen] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [MapClick, setMapClick] = useState(false);
  const [genre, setGenre] = useState('');
  const [nump, setNump] = useState("");
  const [budget, setBudget] = useState('');
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [SubmitFormOpen, setSubmitFormOpen] = useState(false);
  const { user } = useAuthContext();

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

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGenre(e.target.value);
  };

  const handleNumpChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNump(e.target.value);
  };

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBudget(e.target.value);
  };

  const handleBodyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBody(e.target.value);
  };

  const nextformat = () => {
    if(!genre || !title || !nump || !budget){
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
    const numValue = Number(nump);
    fetch("http://localhost:8000/gatherings/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pos_lat: lat,
        pos_lng: lng,
        host: user.id,
        genre: genre,
        body: body,
        num_participant: numValue,
        start_time: "2020-07-27T02:12:40Z",
        budget: budget,
        title: title
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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
    setTitle("");
    setNump("");
    setBudget("");
    setBody("");
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
        title={title}
        nump={nump}
        budget={budget}
        body={body}
        SubmitFormOpen={SubmitFormOpen}
        onGenreChange={handleGenreChange}
        onTitleChange={handleTitleChange}
        onBudgetChange={handleBudgetChange}
        onBodyChange={handleBodyChange}
        onNumpChange={handleNumpChange}
        nextformat={nextformat}
        onToggleSubmitForm={handleToggleSubmitForm}
      />
      <GooglemapActionButton
				SubmitFormOpen={SubmitFormOpen}
				onToggleSubmitForm={handleToggleSubmitForm}
        MapClick={MapClick}
      />
      {isUserInfoOpen && <div onClick={handleCloseUserInfo} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />}
    </>
  );
};

export default Home;