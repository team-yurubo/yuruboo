// src/api.ts
import { Data } from '@react-google-maps/api';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export const getGatheringId = async (): Promise<string> => {
  // gathering_id を非同期に取得する関数の実装
  // ここでは仮の gathering_id を返す例を示します
  return "00000000-0000-0000-0000-000000000001";
};

export const getMessages = async (gathering_id: string) => {
    const response = await fetch(`http://localhost:8000/messagelogs/`, {
      credentials: 'include', // クッキーを含めるためのオプション
    });
    const data = await response.json();

    console.log(data);

    let return_data = [];

    console.log("start for loop");
    // gathering_id に対応する MessageLog を返す
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === gathering_id) {
        return_data = (data[i].messages);
      }
    }
    console.log(return_data);
    return return_data;
};

