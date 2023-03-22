import styled from '@emotion/styled';
import { FC } from 'react';
import { useMouseDown } from '../../hooks/UseMouseDown';

export interface ResetProps {
	onReset: () => void;
}

export const Reset: FC<ResetProps> = ({ onReset }) => {
	const [mouseDown, onMouseDown, onMouseUp] = useMouseDown();
	return (
		<Button
			onClick={onReset}
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseUp}
			onMouseUp={onMouseUp}>
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
	padding: 0.3vw 0.5vw;
`;
