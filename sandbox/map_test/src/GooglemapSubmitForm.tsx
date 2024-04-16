import { QRCode } from 'react-qrcode-logo';

import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

type Props = {
  // text: string;
  latitude: string;
  longitude: string;
  SubmitFormOpen: boolean;
  onSubmit: () => void;
  onLatitudeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onLongitudeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleSubmitForm: () => void;
};

const currencies = [
  {
    value: 'all',
    label: 'すべて',
  },
  {
    value: 'ramen',
    label: 'ラーメン',
  },
  {
    value: 'nomi',
    label: '飲み',
  },
  {
    value: 'sightseeing',
    label: '観光',
  },
  {
    value: 'movie',
    label: '映画',
  },
];

export const GooglemapSubmitForm = (props: Props) => (
  <Dialog fullWidth open={props.SubmitFormOpen} onClose={props.onToggleSubmitForm}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <div style={{ margin: '1em' }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="緯度"
          onChange={(e) => props.onLatitudeChange(e)}
          value={props.latitude}
          autoFocus
        />
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="経度"
          onChange={(e) => props.onLongitudeChange(e)}
          value={props.longitude}
          autoFocus
        />
        <TextField
          aria-label="todo-input"
          select
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="タグ"
          autoFocus
        >
          {currencies.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{
                width: '100%',
                fontSize: '20px',
                fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
              }}
              >
              {option.label}
            </option>
          ))}
        </TextField>
        <DialogActions>
          <Button
            aria-label="form-add"
            color="secondary"
            onClick={props.onSubmit}
          >
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);