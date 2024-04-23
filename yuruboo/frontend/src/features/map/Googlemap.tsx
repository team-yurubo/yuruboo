import { GoogleMap, LoadScript } from '@react-google-maps/api'
import GlobalStyles from '@mui/material/GlobalStyles';

/*
地図の全画面表示
*/
const containerStyle = {
  width: '100vw',
  height: '100vh',
}

/*
地図ロード時の中心となる座標
これは百万遍
*/
const center = {
  lat: 35.028868,
  lng: 135.779103,
}

/*
地図上のラベルをすべて非表示にする
*/
const options = {
  styles:
  [
    {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
    }
  ],
}

export const Googlemap = () => {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <LoadScript googleMapsApiKey='AIzaSyCSMZnyfMa_TKne0vwfqDUC1I5rFfKZfu8'>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
        >
        </GoogleMap>
      </LoadScript>
    </>
  );
};