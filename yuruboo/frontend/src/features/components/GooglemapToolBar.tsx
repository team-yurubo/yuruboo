import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

type Props = {
    MapClick: boolean;
  };

  export const GooglemapToolBar = (props: Props) => {
    return (props.MapClick && 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
				position="fixed"
				sx={{ top: 0 }}
			>
        <Toolbar>
          {/* <Typography>Yuruboo</Typography> */}
          <div>
            <p style={{fontSize: '20px',textAlign: 'center',}}>集合場所を選択してください</p>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
  )};