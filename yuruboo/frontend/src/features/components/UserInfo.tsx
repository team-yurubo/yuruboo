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
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Signout from "../../features/auth/Signout";
import { useAuthContext } from "../auth/AuthContext";
import { fetchAsyncLogoutUser } from "../auth/api";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onToggleFlowerGarden: () => void;
};

export const UserInfo = (props: Props) => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const { signout } = useAuthContext();

  const handleLogout = async () => {
    await fetchAsyncLogoutUser();
    signout();
    navigate("/signin");
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <Box
      position="fixed"
      sx={{ 
        backgroundColor:"#dbe9f4",
        width: "60vw",
        right:15,
        top:85,
        zIndex: 10000,
        boxShadow:2,
        borderRadius: 1,
        textAlign:"center",
        padding:2,
        color:"#444"
      }}
    >
      <div>
      {user.email}
      </div>
      <Fab sx={{ 
        backgroundColor:"#3D405B",
        margin:2,
     }}>
      </Fab>
      <Box
        sx={{
          width: "50vw",
          backgroundColor:"#f8f8ff",
          margin:"auto",
          borderRadius: 1,
        }}
      >
        <List>
          <ListItem
            sx={{ 
              borderBottom:2,
              borderColor:"#dbe9f4",
            }}>
              <ListItemText primary={<>名前：{user.user_name}</>} />
          </ListItem>
          <ListItem
            sx={{ 
              borderBottom:2,
              borderColor:"#dbe9f4",
            }}>
              <ListItemText primary={<>ID：{user.id}</>} />
          </ListItem>
          <ListItem
            disablePadding
            sx={{ 
              borderBottom:2,
              borderColor:"#dbe9f4",
            }}>
            <ListItemButton onClick={props.onToggleFlowerGarden}>
                <ListItemIcon>
                  <LocalFloristIcon />
                </ListItemIcon>
                <ListItemText primary="Go To お花畑" />
              </ListItemButton>
          </ListItem>
          <ListItem key="signout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Signout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};