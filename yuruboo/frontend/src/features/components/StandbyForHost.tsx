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
import { useState } from "react";

type Props = {
  isOpen: boolean;
  isHost: boolean;
  onClose: () => void;
};

export const StandbyForHost = (props: Props) => {
  if (!props.isOpen) {
    return null;
  }
  if (props.isHost){
    return (
      <Box
        position="fixed"
        sx={{
            backgroundColor:"#cdb4db",
            width: "100vw",
            height: "100vh",
            zIndex: 10000,
            display: "flex", 
            alignItems: "center"
          }}
      >
        <Box
          onClick={props.onClose}
          sx={{
            width: "20vw",
            height: "20vw",
            backgroundColor:"#bde0fe",
            margin: "auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          削除
        </Box>
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      sx={{
          backgroundColor:"#cdb4db",
          width: "100vw",
          height: "100vh",
          zIndex: 10000,
          display: "flex", 
          alignItems: "center"
        }}
    >
      <Box
        onClick={props.onClose}
        sx={{
          width: "20vw",
          height: "20vw",
          backgroundColor:"#bde0fe",
          margin: "auto",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        閉じる
      </Box>
    </Box>
  );
};