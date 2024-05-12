type MessageLog = {
    id: string,
    sender: string,
    body: string,
    gathering: string,
    created_at: Date,
  };

  type ChatLog = {
    key: string,
    name: string,
    body: string,
    created_at: Date,
  };
  

export type { MessageLog , ChatLog };
