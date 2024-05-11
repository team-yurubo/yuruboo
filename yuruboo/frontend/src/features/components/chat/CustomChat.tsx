import React, {useState, useMemo, useEffect} from 'react';
// import db from './firebaseConfig';
import './chat.css';
import { useAuthContext } from '../../auth/AuthContext';
import UserInfoWrapper from './UserInfoWrapper';

type ChatLog = {
  key: string,
  name: string,
  body: string,
  created_at: Date,
};


/**
 * UNIX TIME => hh:mm
 **/
function getStrTime(time: any){
  const t = new Date(time);
  return `${t.getHours()}`.padStart(2, '0') + ':' + `${t.getMinutes()}`.padStart(2, '0');
}


/**
 * チャットコンポーネント(Line風)
*/
const CustomChat: React.FC = () => {
  const { user } = useAuthContext();
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [msg, setMsg] = useState('');
  const userName = user.user_name
  const [gathering_id, setGatheringId] = useState(null);
  
  const dummyPngURL1 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXNTz9LqGn-dTyacBt2n0JiCetzrkETOcF1neofXOypU1Zsb9afUTiMRm_G71xMuiuUH7WQKV8or5nhAARuDmTh7mp31wAh5mckUaUgTU3D_Hzz7hjDRsddYUWpXWrSdYrozHOj9heLMw/s800/monster01.png"
  const dummyPngURL2 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcGlFVplWQL65fn-lrtazTQL6rvrthKW6gtO2EeHeeNDEP2nJtpdUhDLzsT60ucQ25WT3KYA7Iw2p0Ji9Kn1RvnmTWhVqc8XbvTIFUu9P6zabvrX4r78cSjnxhhWELWL7piPX4rUeSdnI/s800/monster02.png"
  const dummyPngURL3 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVMT6Um09tlBYsR7k6je7dtPnqC4dFPIT7N1FM47dErqbe6ePNc495vo_JljzhXAkhZgGKMTRUSqMokIJ7etD7fVhKUFhI-4eXQrV8RBdV2Y_aAEDp-7AcH-1vgrNHPIn7opLb-5f5SJat/s800/kamihikouki_omote.png"
  
  console.log("user",user)

  useEffect(() => {
    postData("http://localhost:8000/participations/", {participant: user.id, gathering:1 }).then((data) => {
      console.log("data",data)
      setGatheringId(1);
    });
  });
  
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

  if (gathering_id === null || gathering_id === undefined) {
    return (
      <div>
        <h1>Chat</h1>
        <UserInfoWrapper />
        <div>参加中のイベントがありません</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Chat</h1>
      <UserInfoWrapper />
    <>
      {/* チャットログ */}
      <h1>{data}</h1>
      <div>      
        {chatLogs.map((item, i) => (
          <div className={userName===item.name? 'balloon_r': 'balloon_l'} key={item.key}>
            {userName===item.name? getStrTime(item.date): '' }
            <div className="faceicon">
              <img src={userName===item.name? dummyPngURL1: dummyPngURL2} width="50px" alt="" />
            </div>
            <div style={{marginLeft: '3px'}}>
              {item.name}<p className="says">{item.msg}</p>
            </div>
            {userName===item.name? '': getStrTime(item.date)}
          </div>
        ))}
      </div>
      
      {/* メッセージ入力 */}
      <form className='chatform' onSubmit={e => { submitMsg();e.preventDefault() }}>
        <div>{userName}</div>       
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <input type='image' onClick={submitMsg} src={dummyPngURL3} width="50px" alt='' />       
      </form>
    </>
    </div>
  );
};

export default CustomChat;