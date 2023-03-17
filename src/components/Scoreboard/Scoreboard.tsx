import styled from '@emotion/styled';
import { FC } from 'react';
import { Counter } from './Counter';
import { Level } from './Level';
import { Reset } from './Reset';

export interface ScoreboardProps {
	levels: string[];

	time: string;

	mines: string;
	onReset: () => void;
}

export const Scoreboard: FC<ScoreboardProps> = ({
	time,
	levels,
	mines,
	onReset,
}) => (
	<Wrapper>
		<Counter>{time}</Counter>
		<Level>{levels}</Level>
		<Reset onReset={onReset} />
		<Counter>{mines}</Counter>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	gap: 0.5em;
	width: max-content;
	padding-bottom: 2vw;
	justify-content: space-between;
	align-items: center;
`;
