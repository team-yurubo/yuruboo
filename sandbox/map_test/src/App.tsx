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
import { GooglemapPosList } from './GooglemapPosList';
import { GooglemapSubmitForm } from './GooglemapSubmitForm';
import { GooglemapFilter } from './GooglemapFilter';

import { MyButton } from './MyButton';

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
	const [text, setText] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [pins, setPins] = useState<Pin[]>([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [PosListOpen, setPosListOpen] = useState(false);
	const [SubmitFormOpen, setSubmitFormOpen] = useState(false);
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
	const handleSubmit = () => {
    if (!latitude || !longitude) {
      setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
      return;
    }

    const newPin: Pin = {
      latitude: latitude,
			longitude: longitude,
      id: new Date().getTime(),
			tag: [],
    };

    setPins((pins) => [newPin, ...pins]);
    setLatitude('');
		setLongitude('');
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
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
			<GooglemapToolBar onToggleDrawer={handleToggleDrawer} />
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
      <MyButton
        SubmitFormOpen={SubmitFormOpen}
        onToggleSubmitForm={handleToggleSubmitForm}
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