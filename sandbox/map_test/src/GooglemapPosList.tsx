import { QRCode } from 'react-qrcode-logo';

import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

type Props = {
  open: boolean;
  onClose: () => void;
  pins: Pin[];
};

export const GooglemapPosList = (props: Props) => (
//   <TodoBackdrop open={props.open} onClick={props.onClose}>
//     <QRCode value="https://sprout2000.github.io/todo" />
//   </TodoBackdrop>
<TodoBackdrop  open={props.open} onClick={props.onClose}>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">ジャンル</TableCell>
            <TableCell align="right">緯度</TableCell>
            <TableCell align="right">経度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.pins.map((pin)=>(
                <TableRow
                key={pin.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {pin.id}
                </TableCell>
                <TableCell align="right">{pin.genre}</TableCell>
                <TableCell align="right">{pin.latitude}</TableCell>
                <TableCell align="right">{pin.longitude}</TableCell>
              </TableRow>
            ))}
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
</TodoBackdrop>
);