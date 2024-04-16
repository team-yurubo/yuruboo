import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

type Props = {
    // filter: Filter;
    onToggleDrawer: () => void;
  };

  export const GooglemapToolBar = (props: Props) => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
				position="fixed"
				sx={{ top: 0 }}
			>
        <Toolbar>
          <IconButton
            aria-label="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography>Yuruboo</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );