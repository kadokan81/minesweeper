import styled from '@emotion/styled';
import { FC, useState } from 'react';

export interface ResetProps {
	onReset: () => void;
}

export const Reset: FC<ResetProps> = ({ onReset }) => {
	const [mouseDown, setMouseDown] = useState(false);

	const setMouseDownTrue = () => setMouseDown(true);
	const setMouseDownFalse = () => setMouseDown(false);

	return (
		<Button
			onClick={onReset}
			onMouseDown={setMouseDownTrue}
			onMouseLeave={setMouseDownFalse}
			onMouseUp={setMouseDownFalse}>
			{mouseDown ? '😯' : '🙂'}
		</Button>
	);
};

// Stryker disable next-line StringLiteral
Reset.displayName = 'Reset';

const Button = styled.button`
	font-size: 1.1vw;
	height: 100%;
	cursor: pointer;
	font-weight: 700;
	border-width: 0.15vw;
	border-style: solid;
	background-color: #d1d1d1;
	border-color: white #9e9e9e #9e9e9e white;
`;
