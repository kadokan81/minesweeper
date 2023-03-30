import { FC, useState } from 'react';
import { GameArea } from '../../components/Game/GameArea';
import { GameOver } from '../../components/Game/GameOver';
import { Wrapper } from '../../components/Game/Wrapper';
import { Grid } from '../../components/Grid/Grid';
import { Scoreboard } from '../../components/Scoreboard';
import { Top } from '../../components/Top';
import { openCell } from '../../helpers/CellManipulation';
import {
	CellState,
	Coords,
	emptyFieldGenerator,
	Field,
	fieldGenerator,
} from '../../helpers/Field';
import { GameLevel, GameSettings, LevelNames } from './GameSettings';

const StaticField: Field = [
	[9, 2, 9, 1, 0, 0, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 1, 0, 1, 9, 1, 1, 9, 1],
	[0, 0, 1, 9, 10, 0, 2, 2, 2, 1, 1, 1],
	[0, 0, 10, 10, 1, 0, 1, 9, 1, 2, 2, 2],
	[0, 1, 1, 2, 2, 9, 1, 1, 1, 0, 0, 0],
	[0, 1, 9, 3, 9, 2, 10, 0, 0, 2, 1, 1],
	[0, 2, 2, 4, 9, 2, 10, 1, 1, 1, 9, 1],
	[0, 1, 9, 2, 1, 1, 1, 9, 1, 2, 2, 2],
	[0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
	[0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
	[0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
	[0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
];

export const GameWithHooks: FC = () => {
	const [level, setLevel] = useState<LevelNames>('beginner');

	const [size, bombs] = GameSettings[level];

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	);

	const gameField = fieldGenerator(size, bombs / (size * size));

	const onClick = (coords: Coords) => {
		const newPlayerField = openCell(coords, playerField, gameField);
		setPlayerField([...newPlayerField]);
	};
	const onChangeLevel = ({
		target: { value: level },
	}: React.ChangeEvent<HTMLSelectElement>) => {
		setLevel(level as LevelNames);
		const [size] = GameSettings[level as LevelNames];
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
		setPlayerField([...newPlayerField]);
	};

	return (
		<Wrapper>
			<Top />
			<GameArea>
				<Scoreboard
					time='1200'
					mines={bombs + ''}
					levels={GameLevel as unknown as string[]}
					defaultLevel={level}
					onChangeLevel={onChangeLevel}
					onReset={() => {}}
				/>
				{/* <GameOver onClick={() => {}} isWin={true}></GameOver> */}
				<Grid onClick={onClick} onContextMenu={() => {}}>
					{playerField}
				</Grid>
			</GameArea>
		</Wrapper>
	);
};
