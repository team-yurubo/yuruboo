import {useState, useEffect} from 'react'

const AxiosGet = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData(url: string) {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      setData(data);
    }

    const interval = setInterval(() => {
      fetchData(url);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data ? <div>{data["time"]}</div> : <div>Loading...</div>;
}

export default AxiosGet;



  /**
   * 
   * @param url 
   * @param searchParams 
   * @returns 
   * 動作確認済み
   */
  async function fetchData(url: string, searchParams: URLSearchParams) {
    if (searchParams.size !== 0) {
      url += "?" + searchParams.toString();
    }
    const res = await fetch(url, {credentials: "include"});
    if (!res.ok) {
      throw new Error("fetchに失敗しました");
    }
    const data = await res.json();
    return data;
  }
  
  /**
   * 
   * @param url 
   * @param data 
   * @returns 
   * 動作確認済み
   */
  async function postData(url: string, data: any) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("postに失敗しました");
    }
    const resData = await res.json();
    return resData;
  }
  
  async function getCurrentParticipation() {
    const participations_query = new URLSearchParams({participant: user.id});
    const participations_url = `http://localhost:8000/participations/`;
  
    const user_participation_data = await fetchData(participations_url, participations_query);
    if (user_participation_data.length === 0) {
      return;
    }
    const user_participation = user_participation_data[0];
    return user_participation;
  }
  
  async function getGathering(gathering_id: any) {
    const gatherings_query = new URLSearchParams();
    const gatherings_url = `http://localhost:8000/gatherings/${gathering_id}/`;
  
    const gathering_data = await fetchData(gatherings_url, gatherings_query);
    if (gathering_data.length === 0) {
      return;
    }
    
    return gathering_data;
  }
  
  async function getMessages(gathering_id: any) {
    const messages_query = new URLSearchParams({gathering: gathering_id});
    const messages_url = `http://localhost:8000/messages/`;
  
    const messages_data = await fetchData(messages_url, messages_query);
    if (messages_data.length === 0) {
      return;
    }
    const messages = messages_data;
    return messages;
  }
  
  async function getCurrentUserMessages(user: any, cache_gathering_id: any = null) {
    let gathering_id;
    if (cache_gathering_id === null) {
  
      const user_participation = await getCurrentParticipation(user);
      if (user_participation === undefined) {
        return [];
      }
      console.log("user_participation",user_participation)
      gathering_id = await getGathering(user_participation.gathering);
    }
    else {
      gathering_id = cache_gathering_id;
    }
    const messages = await getMessages(gathering_id);
    return messages;
  }
  
  async function fetchChatLogs(user:any, gathering_id: any, setChatLogs: any) {
    const messages = await getCurrentUserMessages(user, gathering_id);
    if (messages === undefined) {
      return;
    }
    const chatLogs = messages.map((message: any) => {
      const log = {
        key: message.id,
        name: message.participant,
        body: message.body,
        created_at: new Date(message.created_at),
      };
      return log;
    });
    setChatLogs(chatLogs);
  }
  
  /**
   * 
   * @param msg 
   * @param sender 
   * @param gathering_id 
   * @param setGatheringId 
   * @returns 
   * 動作確認済み
   */
  async function sendMsgToDB( msg: any, sender:any, gathering_id: any, setGatheringId: any) {
    if (gathering_id === null) {
      const user_participation = await getCurrentParticipation(sender);
      if (user_participation === undefined) {
        return;
      }
      setGatheringId(user_participation.gathering);
    }
    const messages_url = `http://localhost:8000/messages/`;
    const postDataBody = {
      gathering: gathering_id,
      sender: sender.id,
      body: msg,
    };
    await postData(messages_url, postDataBody);  
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    getCurrentUserMessages(user).then((messages) => {
      console.log("messages ",messages)
      setData(messages);
    });
  }, []);

  /**
   * チャットログに追加
   */
  function addLog(id: string, data: any) {
    const log = {
      key: id,
      ...data,
    };
    // Firestoreから取得したデータは時間降順のため、表示前に昇順に並び替える
    setChatLogs((prev) => [...prev, log,].sort((a,b) => a.date.valueOf() - b.date.valueOf()));
  }

  /**
   * メッセージ送信
   */
  const submitMsg = async () => {
    if (msg.length === 0) {
      return;
    }

    // // チャットログへ追加
    // const data = {
    //   name: userName,
    //   body: msg,
    //   created_at: new Date(),
    // };
    
    // addLog(new Date().getTime().toString(), data);

    // メッセージ送信
    sendMsgToDB(msg, user, gathering_id, setGatheringId);

    setMsg("");
  };