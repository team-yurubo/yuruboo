import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { MarkerF } from '@react-google-maps/api'
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import iconPath from "./assets/food.png";

import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

type Props = {
    pins: Pin[];
  };

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

const containerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: 35.028868,
  lng: 135.779103,
}

const marking = {
    lat: 35.028868,
    lng: 135.779103,
}

const test = [
    {
        lat: 35.028868,
        lng: 135.779103,
    },
    {
        lat: 35.040803,
        lng: 135.770961,
    },
    {
        lat: 35.015110,
        lng: 135.782261,
    },
]

const onLoad = (marker: google.maps.Marker) => {
  console.log('marker loaded at', marker.getPosition()?.toString())
}

// const MapArea = styled(Backdrop)(({ theme }) => ({
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   }));
// const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCSMZnyfMa_TKne0vwfqDUC1I5rFfKZfu8&libraries=places`

// type Props = {
//     open: boolean;
//   };

export const Googlemap=(props: Props)=>{
    return (
        <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <LoadScript googleMapsApiKey='AIzaSyCSMZnyfMa_TKne0vwfqDUC1I5rFfKZfu8'>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        >
            {props.pins.map((pin)=>{
                const posi ={lat:Number(pin.latitude), lng:Number(pin.longitude)};
                return(
                    <MarkerF
            visible={true}
            position={posi}
            onLoad={onLoad}
            />
                );
            })}
            {/* <MarkerF
            visible={true}
            position={marking}
            onLoad={onLoad}
            /> */}
        </GoogleMap>
        </LoadScript>
        </ThemeProvider>

    );
};