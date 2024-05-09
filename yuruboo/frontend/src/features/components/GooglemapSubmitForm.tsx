import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField, { TextFieldProps }  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';

type Props = {
  genre: string;
  SubmitFormOpen: boolean;
  nextformat: () => void;
  onGenreChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleSubmitForm: () => void;

};

const currencies = [
  {
    value: 'food',
    label: '食事',
  },
  {
    value: 'sweets',
    label: '甘味',
  },
  {
    value: 'drink',
    label: '飲み',
  },
  {
    value: 'sightseeing',
    label: '観光',
  },
  {
    value: 'film',
    label: '映画',
  },
  {
    value: 'random',
    label: 'その他',
  },
];

const currencies2 = [
  {
    value: 'all',
    label: '2人',
  },
  {
    value: 'ramen',
    label: '3人',
  },
  {
    value: 'nomi',
    label: '4人',
  },
  {
    value: 'sightseeing',
    label: '5人以上',
  },
];

const currencies3 = [
  {
    value: 'all',
    label: '~ 1,000円',
  },
  {
    value: 'ramen',
    label: '1,000円 ~ 3,000円',
  },
  {
    value: 'nomi',
    label: '3,000円 ~ 5,000円',
  },
  {
    value: 'nom',
    label: '5,000円 ~',
  },
  {
    value: 'sightseeing',
    label: '未定',
  },
];

export const GooglemapSubmitForm = (props: Props) => (
  <Dialog open={props.SubmitFormOpen} onClose={props.onToggleSubmitForm} 
    sx={{
      '& .MuiPaper-root': {
        position: 'absolute', // 三角形を配置するために必要
        bottom: '100px',
        left: '-10px', // 左端からの位置
        width: '300px', // 幅を400pxに固定
        maxHeight: '80vh',
        backgroundColor: 'white',
        borderRadius: 2,
        overflow: 'visible',
        // 三角形のスタイル
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -22, // 三角形の位置調整
          left: 'calc(5%)', // 中央に配置
          borderWidth: '22px 12px 0', // 三角形のサイズ
          borderStyle: 'solid',
          borderColor: 'white transparent', // 三角形の色と透明部分
          display: 'block',
          width: 0,
          zIndex: 0,
        }
      }
    }}
  >
    <div style={{ margin: "5px" }}>
      <DialogTitle>募集の作成</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div style={{ margin: "15px" }}>
          <TextField
            aria-label="todo-input"
            select
            variant="standard"
            style={{
              width: '100%',
              fontSize: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="ジャンル"
            onChange={(e) => props.onGenreChange(e)}
            value={props.genre}
          >
            {currencies.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                }}
                >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            aria-label="todo-input"
            select
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="人数"
          >
            {currencies2.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                }}
                >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            aria-label="todo-input"
            select
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="集合時間"
          >
            {currencies3.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                }}
                >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            aria-label="todo-input"
            select
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="予算"
          >
            {currencies3.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                }}
                >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            aria-label="todo-input"
            multiline
            rows={3}
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="詳細"
          />
          <DialogActions>
            <Button
              aria-label="form-add"
              color="error"
              onClick={props.nextformat}
              style={{
                lineHeight: 'normal', 
                padding: '6px 12px', 
                verticalAlign: 'middle'}}
            >
              次へ
            </Button>
          </DialogActions>
        </div>
      </form>
    </div>
  </Dialog>
);