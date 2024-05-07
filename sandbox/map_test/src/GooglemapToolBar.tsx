import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

type Props = {
    // filter: Filter;
    onToggleDrawer: () => void;
    MapClick: boolean;
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
          {/* <Typography>Yuruboo</Typography> */}
          <div>
          <img src={"https://raw.githubusercontent.com/flatp/yuruimage/main/logo.png"} alt="Yuruboo" style={{ width: '15%', height: 'auto',marginTop: '5px', marginBottom: '5px', }} />
            {props.MapClick && <p style={{fontSize: '20px',textAlign: 'center',}}>集合場所を選択してください</p>}
            {/* 他のコンポーネントやロジックをここに追加 */}
        </div>
        </Toolbar>
      </AppBar>
    </Box>
  );