// src/api.ts
import axios from 'axios';

export const getGatheringId = async (): Promise<string> => {
  return "00000000-0000-0000-0000-000000000001";
};

export const getMessageLogs = async (gatheringId: string) => {
  const response = await axios.get(`http://localhost:8000/messagelogs/${gatheringId}/`);
  return response.data;
};

export const sendMessage = async (message: { gathering: string; body: string; sender: number }) => {
  const response = await axios.post(`http://localhost:8000/messages/`, message);
  return response.data;
};
