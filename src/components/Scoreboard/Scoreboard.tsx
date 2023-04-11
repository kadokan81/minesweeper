import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';
import { Counter } from './Counter';
import { Level } from './Level';
import { Reset } from './Reset';

export interface ScoreboardProps {
	levels: string[];
	defaultLevel: string;

	time: string;

	mines: string;
	onReset: () => void;
	onChangeLevel: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Scoreboard: FC<ScoreboardProps> = ({
	time,
	levels,
	defaultLevel,
	mines,
	onReset,
	onChangeLevel: onChange,
}) => (
	<Wrapper>
		<Counter>{time}</Counter>
		<div style={{ display: 'flex ', gap: '20px' }}>
			<Level value={defaultLevel} onChange={onChange}>
				{levels}
			</Level>
			<Reset onReset={onReset} />
		</div>

		<Counter>{mines}</Counter>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	gap: 1em;
	justify-content: space-between;

	padding-bottom: 0.5em;
`;
