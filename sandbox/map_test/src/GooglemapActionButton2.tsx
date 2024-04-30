import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';

type Props = {
//   todos: Todo[];
//   filter: Filter;
//   alertOpen: boolean;
  SubmitFormOpen2: boolean;
//   onToggleAlert: () => void;
  onToggleSubmitForm2: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  left: 15,
  bottom: 90,
});

export const GooglemapActionButton2 = (props: Props) => {
  return (
    <FabButton
    	color="primary"
			onClick={props.onToggleSubmitForm2}
			disabled={props.SubmitFormOpen2}
    >
			<Icon>help</Icon>
    </FabButton>
  );
};