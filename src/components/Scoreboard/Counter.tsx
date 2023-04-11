import styled from '@emotion/styled';
import { FC, memo } from 'react';

export interface CounterProps {
	children: string;
}

export const Counter: FC<CounterProps> = memo(({ children }) => (
	<Frame>{children}</Frame>
));

const Frame = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 50px;
	padding: 0.2em;
	font-size: 0.8em;
	color: #ec433c;
	border: 0.15vw inset;
	line-height: 1.5vw;
	letter-spacing: 0.08em;
	background: #333;
	text-shadow: 0 0 0.1vw #ec433c;
`;
