import React from 'react'
import { useAuthContext } from '../../auth/AuthContext';
import { MessageLog } from './types';


  type Props = {
    messageLogs: MessageLog[];
  };
  

/**
 * UNIX TIME => hh:mm
 **/
function getStrTime(time: any){
    const t = new Date(time);
    return `${t.getHours()}`.padStart(2, '0') + ':' + `${t.getMinutes()}`.padStart(2, '0');
  }
  

const MessageWindow : React.FC<Props> = (props: Props) => {

  const { user } = useAuthContext()
  const userName = user.user_name

  const dummyPngURL1 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXNTz9LqGn-dTyacBt2n0JiCetzrkETOcF1neofXOypU1Zsb9afUTiMRm_G71xMuiuUH7WQKV8or5nhAARuDmTh7mp31wAh5mckUaUgTU3D_Hzz7hjDRsddYUWpXWrSdYrozHOj9heLMw/s800/monster01.png"
  const dummyPngURL2 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcGlFVplWQL65fn-lrtazTQL6rvrthKW6gtO2EeHeeNDEP2nJtpdUhDLzsT60ucQ25WT3KYA7Iw2p0Ji9Kn1RvnmTWhVqc8XbvTIFUu9P6zabvrX4r78cSjnxhhWELWL7piPX4rUeSdnI/s800/monster02.png"
  const dummyPngURL3 = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVMT6Um09tlBYsR7k6je7dtPnqC4dFPIT7N1FM47dErqbe6ePNc495vo_JljzhXAkhZgGKMTRUSqMokIJ7etD7fVhKUFhI-4eXQrV8RBdV2Y_aAEDp-7AcH-1vgrNHPIn7opLb-5f5SJat/s800/kamihikouki_omote.png"
    const { messageLogs } = props
  return (
    <>
      {/* チャットログ */}
      <div>      
        {messageLogs.map((item, i) => (
          <div className={userName===item.sender? 'balloon_r': 'balloon_l'} key={item.key}>
            {userName===item.sender? getStrTime(item.created_at): '' }
            <div className="faceicon">
              <img src={userName===item.sender? dummyPngURL1: dummyPngURL2} width="50px" alt="" />
            </div>
            <div style={{marginLeft: '3px'}}>
              {item.sender}<p className="says">{item.body}</p>
            </div>
            {userName===item.sender? '': getStrTime(item.created_at)}
          </div>
        ))}
      </div>
    </>
  )
}

export default MessageWindow

