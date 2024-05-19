import { Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import LogoutIcon from "@mui/icons-material/Logout";
import Fab from '@mui/material/Fab';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Signout from "../../features/auth/Signout";
import { useAuthContext } from "../auth/AuthContext";
import { fetchAsyncLogoutUser } from "../auth/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  isHost: boolean;
  onClose: () => void;
  gatheringID: string;
  userID: number;
};

export const StandbyForHost = (props: Props) => {
  const [gatheringData, setGatheringData] = useState(null);

  useEffect(() => {
    if (props.isOpen) {
      fetch("http://localhost:8000/participations/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gathering: props.gatheringID,
          participant: props.userID
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log(`おしり:${data}`);
        })
        .catch(error => console.error('Error:', error));

        fetch(`http://localhost:8000/gatheringsv2/${props.gatheringID}/`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setGatheringData(data);
        })
        .catch(error => console.error('Error:', error));
    };
  }, [props.isOpen, props.gatheringID, props.userID]);

  if (!props.isOpen) {
    return null;
  }
  const buttonText = props.isHost ? "イベントを終了する" : "イベントから退出する";
  const typeOfUser = props.isHost ? "主催者" : "参加者";

  const handleDelete = () => {
    fetch(`http://localhost:8000/closegathering/${props.gatheringID}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onClose();
      })
      .catch(error => console.error('Error:', error));
  };

  const handleClose = () => {
    fetch(`http://localhost:8000/deletemyparticipation/${props.userID}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.onClose();
      })
      .catch(error => console.error('Error:', error));
  };

  const reloadData = () => {
    fetch(`http://localhost:8000/gatheringsv2/${props.gatheringID}/`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setGatheringData(data);
        })
        .catch(error => console.error('Error:', error));
  };

  return (
    <Box
      position="fixed"
      sx={{
        backgroundColor: "#cdb4db",
        width: "100vw",
        height: "100vh",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {gatheringData && (
        <Box
        sx={{
          marginTop: "25vh",
          textAlign: "center",
          fontSize: "20px"
        }}
        >
          <div style={{ fontSize: "35px", fontWeight: "bold" }}>{gatheringData["title"]}</div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>あなたは<span style={{ fontWeight: "bold"}}>{typeOfUser}</span>です</div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>ジャンル:<span style={{ fontWeight: "bold"}}>{gatheringData["genre"]}</span></div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>現在の参加者:<span style={{ fontWeight: "bold"}}>{Object.keys(gatheringData["participants"]).length}</span></div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>詳細</div>
          <div style={{ fontSize: "17.5px" }}>{gatheringData["body"]}</div>
        </Box>
      )}
      <Box
      onClick={reloadData}
      sx={{
        width: "15vw",
        height: "7.5vw",
        backgroundColor: "#E07A5F",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        fontWeight: "bold",
        marginBottom: "15vh",
        marginRight: "20vw"
      }}
      >
        更新
      </Box>
      <Box
        onClick={props.isHost ? handleDelete : handleClose}
        sx={{
          width: "60vw",
          height: "12.5vw",
          backgroundColor: "#bde0fe",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10vh"
        }}
      >
        {buttonText}
      </Box>
    </Box>
  );
};