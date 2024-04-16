import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';

type Props = {
//   todos: Todo[];
//   filter: Filter;
//   alertOpen: boolean;
  SubmitFormOpen: boolean;
//   onToggleAlert: () => void;
  onToggleSubmitForm: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  left: 15,
  bottom: 15,
});

export const GooglemapActionButton = (props: Props) => {
  return (
    <FabButton
    	color="secondary"
			onClick={props.onToggleSubmitForm}
			disabled={props.SubmitFormOpen}
    >
			<Icon>create</Icon>
    </FabButton>
  );
};