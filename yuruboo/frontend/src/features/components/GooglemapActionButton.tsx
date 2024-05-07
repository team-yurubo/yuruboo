import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';

type Props = {
  SubmitFormOpen: boolean;
  onToggleSubmitForm: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  left: 20,
  bottom: 40,
});

export const GooglemapActionButton = (props: Props) => {
  return (
    <FabButton
    	color="primary"
			onClick={props.onToggleSubmitForm}
			disabled={props.SubmitFormOpen}
    >
	<Icon>+</Icon>
    </FabButton>
  );
};