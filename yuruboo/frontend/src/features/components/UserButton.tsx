import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';

type Props = {
	onToggleUserInfo: () => void;
};

const FabButton = styled(Fab)({
	position: 'fixed',
	right: 15,
	top: 15,
	disableRipple: true,
	zIndex: 10000,
});

export const UserButton: React.FC<Props> = ({ onToggleUserInfo }) => {
	return (
	<FabButton
		sx={{
			backgroundColor: "#3D405B",
			'&:hover': {
				backgroundColor: "#3D405B",
			},
			'&:active': {
				backgroundColor: "#3D405B",
			},
		}}
		onClick={onToggleUserInfo}>
	</FabButton>
	);
};