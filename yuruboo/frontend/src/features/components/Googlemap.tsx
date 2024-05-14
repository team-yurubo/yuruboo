import {useState} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { MarkerF, InfoWindowF } from '@react-google-maps/api'
import GlobalStyles from '@mui/material/GlobalStyles';


type Props = {
  pins: Pin[];
  createMarker: (
    e: google.maps.MapMouseEvent
  ) => void;
};

const budge_dic = [
  {
    value: 'FREE',
    label: '無料',
  },
  {
    value: 'UNDER_1000',
    label: '~ 1,000円',
  },
  {
    value: 'UNDER_3000',
    label: '1,000円 ~ 3,000円',
  },
  {
    value: 'UNDER_5000',
    label: '3,000円 ~ 5,000円',
  },
  {
    value: 'OVER_5000',
    label: '5,000円 ~',
  },
  {
    value: 'UNDECIDED',
    label: '未定',
  },
];

const getLabelByValue = (value: string): string | undefined => {
  const budget = budge_dic.find(b => b.value === value);
  return budget ? budget.label : undefined;
};

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
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: false,
}

const onLoad = (marker: google.maps.Marker) => {
  console.log('marker loaded at', marker.getPosition()?.toString())
}

export const Googlemap = (props: Props) => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <LoadScript googleMapsApiKey='AIzaSyCSMZnyfMa_TKne0vwfqDUC1I5rFfKZfu8'>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
            onClick={props.createMarker}
        >
          {props.pins.map((pin)=>{
                const posi ={lat:Number(pin.latitude), lng:Number(pin.longitude)};
                return(
                    <MarkerF
            visible={true}
            position={posi}
            onLoad={onLoad}
            onClick={() => setSelectedPin(pin)}
            icon={{
              url: "https://raw.githubusercontent.com/flatp/yuruimage/main/"+pin.genre+".png", // 画像のURLに置き換える
              scaledSize: new window.google.maps.Size(60, 60), // アイコンのサイズを調整する
            }}
            />
                );
            })}
            {selectedPin && (
                <InfoWindowF
                    position={{ lat: Number(selectedPin.latitude), lng: Number(selectedPin.longitude) }}
                    onCloseClick={() => setSelectedPin(null)}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -70) // ここでYオフセットを調整
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h2>{selectedPin.title}</h2>
                        <p>{selectedPin.genre}</p>
                        <p>定員：{selectedPin.nump}</p>
                        <p>予算：{getLabelByValue(selectedPin.budget)}</p>
                        <p>集合時間：{selectedPin.time}</p>
                        <p>{selectedPin.body}</p>
                        <button>
                          参加
                        </button>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};