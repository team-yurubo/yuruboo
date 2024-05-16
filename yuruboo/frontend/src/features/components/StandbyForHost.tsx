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
        })
        .catch(error => console.error('Error:', error));
    }
  }, [props.isOpen, props.gatheringID, props.userID]);

  if (!props.isOpen) {
    return null;
  }
  const buttonText = props.isHost ? "削除" : "閉じる";

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

  return (
    <Box
      position="fixed"
      sx={{
        backgroundColor: "#cdb4db",
        width: "100vw",
        height: "100vh",
        zIndex: 10000,
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* {props.gatheringID} */}
      {/* {props.userID} */}
      <Box
        onClick={props.isHost ? handleDelete : handleClose}
        sx={{
          width: "20vw",
          height: "20vw",
          backgroundColor: "#bde0fe",
          margin: "auto",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {buttonText}
      </Box>
    </Box>
  );
};