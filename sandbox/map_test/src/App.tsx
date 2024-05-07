import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Slide } from "@mui/material";
import { Googlemap } from './Googlemap';
import { TodoApp } from "./TodoApp";

import { GooglemapToolBar } from './GooglemapToolBar';
import { GooglemapSideBar } from './GooglemapSideBar';
import { GooglemapActionButton } from './GooglemapActionButton';
import { GooglemapActionButton2 } from './GooglemapActionButton2';
import { GooglemapPosList } from './GooglemapPosList';
import { GooglemapSubmitForm } from './GooglemapSubmitForm';
import { GooglemapSubmitForm2 } from './GooglemapSubmitForm2';
import { GooglemapFilter } from './GooglemapFilter';

import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {
  const [genre, setGenre] = useState('');
	const [text, setText] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [pins, setPins] = useState<Pin[]>([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [PosListOpen, setPosListOpen] = useState(false);
	const [SubmitFormOpen, setSubmitFormOpen] = useState(false);
  const [SubmitFormOpen2, setSubmitFormOpen2] = useState(false);
  const [MapClick, setMapClick] = useState(false);
	const [pinFilter, setPinFilter] = useState<PinFilter>('all');
	const handleTogglePosList = () => {
    setPosListOpen((PosListOpen) => !PosListOpen);
  };
	const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };
	const handleToggleSubmitForm = () => {
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
  };
  const handleToggleSubmitForm2 = () => {
    setSubmitFormOpen2((SubmitFormOpen2) => !SubmitFormOpen2);
  };
  const nextformat = () => {
    if(!genre){
      setSubmitFormOpen2((SubmitFormOpen2) => !SubmitFormOpen2);
      return
    }
    setMapClick((MapClick) => (!MapClick))
    setSubmitFormOpen2((SubmitFormOpen2) => !SubmitFormOpen2);
  }
	const handleSubmit = () => {
    if (!latitude || !longitude || !genre) {
      if (SubmitFormOpen) {
        setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
      }
      if (SubmitFormOpen2) {
        setSubmitFormOpen2((SubmitFormOpen2) => !SubmitFormOpen2);
      }
      return;
    }
    setMapClick((MapClick) => (!MapClick))
    const newPin: Pin = {
      genre: genre,
      latitude: latitude,
			longitude: longitude,
      id: new Date().getTime(),
			tag: [],
    };

    setPins((pins) => [newPin, ...pins]);
    setLatitude('');
		setLongitude('');
    setGenre('');
    //setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
    //setSubmitFormOpen2((SubmitFormOpen2) => !SubmitFormOpen2);
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
    setLatitude('');
		setLongitude('');
    setGenre('');
  };
  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGenre(e.target.value);
  };
	const handleLatitudeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLatitude(e.target.value);
  };
	const handleLongitudeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLongitude(e.target.value);
  };
	const handleSort = (pinFilter: PinFilter) => {
		setPinFilter(pinFilter);
	};
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
			<GooglemapToolBar 
      onToggleDrawer={handleToggleDrawer}
      MapClick={MapClick} />
      <GooglemapSideBar
        drawerOpen={drawerOpen}
        // onSort={handleSort}
        // onToggleQR={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
				onTogglePosList={handleTogglePosList}
        // onToggleGooglemap={handleToggleGooglemap}
      />
			<Googlemap
				pins={pins}
        createMarker={createMarker}
			/>
			<GooglemapPosList
				open={PosListOpen}
				onClose={handleTogglePosList}
				pins={pins}
			/>
			<GooglemapSubmitForm
        latitude={latitude}
				longitude={longitude}
        SubmitFormOpen={SubmitFormOpen}
        onLatitudeChange={handleLatitudeChange}
				onLongitudeChange={handleLongitudeChange}
        onSubmit={handleSubmit}
        onToggleSubmitForm={handleToggleSubmitForm}
      />
      <GooglemapSubmitForm2
        latitude={latitude}
				longitude={longitude}
        genre={genre}
        SubmitFormOpen2={SubmitFormOpen2}
        onGenreChange={handleGenreChange}
        onLatitudeChange={handleLatitudeChange}
				onLongitudeChange={handleLongitudeChange}
        onSubmit={handleSubmit}
        MapClick={MapClick}
        nextformat={nextformat}
        onToggleSubmitForm2={handleToggleSubmitForm2}
      />
			<GooglemapActionButton
				SubmitFormOpen={SubmitFormOpen}
				onToggleSubmitForm={handleToggleSubmitForm}
        // todos={todos} 
        // filter={filter}
        // alertOpen={alertOpen}
        // dialogOpen={dialogOpen}
        // onToggleAlert={handleToggleAlert}
        // onToggleDialog={handleToggleDialog}
      />
      <GooglemapActionButton2
				SubmitFormOpen2={SubmitFormOpen2}
				onToggleSubmitForm2={handleToggleSubmitForm2}
        // todos={todos} 
        // filter={filter}
        // alertOpen={alertOpen}
        // dialogOpen={dialogOpen}
        // onToggleAlert={handleToggleAlert}
        // onToggleDialog={handleToggleDialog}
      />
			<GooglemapFilter
				pinFilter={pinFilter}
				// handleSort={handleSort}
			/>
		</ThemeProvider>
		// <BrowserRouter>
		// <Slide in={!trigger}>
		// 	<Box sx={{ flexGrow: 1 }}>
		// 		<AppBar position="static">
		// 		<Toolbar>
		// 		<IconButton
    //       aria-label="menu-button"
    //       size="large"
    //       edge="start"
    //       color="inherit"
    //       sx={{ mr: 2 }}
    //     >
    //       <Icon>menu</Icon>
    //     </IconButton>
		// 			<Typography>
		// 			<Link to="/TodoApp">TodoApp</Link>
		// 			<Link to="/Googlemap">Googlemap</Link>
		// 			</Typography>
		// 		</Toolbar>
		// 		</AppBar>
		// 	</Box>
		// 	</Slide>
		// 	<Routes>
		// 		<Route path="/TodoApp" element={<TodoApp />} />
		// 		<Route path="/Googlemap" element={<Googlemap />} />
		// 	</Routes>
		// </BrowserRouter>
	);
};