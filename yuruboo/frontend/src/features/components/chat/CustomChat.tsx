import React, {useState, useMemo, useEffect} from 'react';
// import db from './firebaseConfig';
import './chat.css';
import { useAuthContext } from '../../auth/AuthContext';

type ChatLog = {
  key: string,
  name: string,
  msg: string,
  date: Date,
};


// /**
//  * ユーザー名 (localStrageに保存)
//  **/
// const getUName = (): string =>  {
//   const userName = localStorage.getItem('firebase-Chat-username');
//   if (!userName) {
//     const inputName = window.prompt('ユーザー名を入力してください', '');
//     if (inputName){
//       localStorage.setItem('firebase-Chat-username', inputName);
//       return inputName;
//     }    
//   }
//   return userName ?? '';
// }

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
  // const userName = useMemo(() => getUName(), []);
  // const messagesRef = useMemo(() => db.collection("chatroom").doc("room1").collection("messages"), []);
  const userName = user.user_name
  const dummyPngURL1 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXNTz9LqGn-dTyacBt2n0JiCetzrkETOcF1neofXOypU1Zsb9afUTiMRm_G71xMuiuUH7WQKV8or5nhAARuDmTh7mp31wAh5mckUaUgTU3D_Hzz7hjDRsddYUWpXWrSdYrozHOj9heLMw/s800/monster01.png"
  const dummyPngURL2 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcGlFVplWQL65fn-lrtazTQL6rvrthKW6gtO2EeHeeNDEP2nJtpdUhDLzsT60ucQ25WT3KYA7Iw2p0Ji9Kn1RvnmTWhVqc8XbvTIFUu9P6zabvrX4r78cSjnxhhWELWL7piPX4rUeSdnI/s800/monster02.png"
  const dummyPngURL3 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKV_oLKiifq2C4ODn3hjGAbeUtiwICKuEphF2A_bMy2vQvgWztE53ZJkv1rh_LXE_6bzvswCuxPIkVENk_2mpN7HPu_jTO-eYOh4Bm2gfWW8eg9YxUqfg_pe9D9iGkflTvxnri1etGrw1r/s800/button_start1.png"
  // useEffect( () => {
  //   // 同期処理イベント（最新10件をとるためdateでソート)
  //   messagesRef.orderBy("date", "desc").limit(10).onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         // チャットログへ追加
  //         addLog(change.doc.id, change.doc.data());
  //         // 画面下部へスクロール
  //         window.scroll(0, document.documentElement.scrollHeight - document.documentElement.clientHeight)
  //       }
  //     });
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);
  
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

    // チャットログへ追加
    const data = {
      name: userName,
      msg: msg,
      date: new Date(),
    };
    
    addLog(new Date().getTime().toString(), data);


    // messagesRef.add({
    //   name: userName,
    //   msg: msg,
    //   date: new Date().getTime(),
    // });

    setMsg("");
  };

  return (
    // <>
    //   {/* チャットログ */}
    //   <div>      
    //     {chatLogs.map((item, i) => (
    //       <div className={userName===item.name? 'balloon_r': 'balloon_l'} key={item.key}>
    //         {userName===item.name? getStrTime(item.date): '' }
    //         <div className="faceicon">
    //           <img src={userName===item.name? dummyPngURL1: dummyPngURL2} width="50px" alt="" />
    //         </div>
    //         <div style={{marginLeft: '3px'}}>
    //           {item.name}<p className="says">{item.msg}</p>
    //         </div>
    //         {userName===item.name? '': getStrTime(item.date)}
    //       </div>
    //     ))}
    //   </div>
      
    //   {/* メッセージ入力 */}
    //   <form className='chatform' onSubmit={e => { submitMsg();e.preventDefault() }}>
    //     <div>{userName}</div>       
    //       <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
    //       <input type='image' onClick={submitMsg} src={dummyPngURL3} width="50px" alt='' />       
    //   </form>
    // </>
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default CustomChat;