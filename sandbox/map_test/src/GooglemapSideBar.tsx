import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { styled } from '@mui/material/styles';
import { indigo, lightBlue, pink } from '@mui/material/colors';

import pjson from '../package.json';

type Props = {
  drawerOpen: boolean;
//   onToggleQR: () => void;
  onToggleDrawer: () => void;
  onTogglePosList: () => void;
//   onSort: (filter: Filter) => void;
	// onToggleGooglemap: () => void;
};

const DrawerList = styled('div')(() => ({
  width: 250,
}));

const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const GooglemapSideBar = (props: Props) => (
  <Drawer
    variant="temporary"
    open={props.drawerOpen}
    onClose={props.onToggleDrawer}
  >
    <DrawerList role="presentation" onClick={props.onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <Icon>create</Icon>
        </DrawerAvatar>
        <p>TODO v{pjson.version}</p>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={props.onTogglePosList}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText secondary="座標一覧" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon>task</Icon>
            </ListItemIcon>
            <ListItemText secondary="Todoアプリに移動" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </DrawerList>
  </Drawer>
);