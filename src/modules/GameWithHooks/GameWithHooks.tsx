import { FC, useCallback } from 'react';
import { GameArea } from '../../components/Game/GameArea';
import { GameOver } from '../../components/Game/GameOver';
import { Wrapper } from '../../components/Game/Wrapper';
import { Grid } from '../../components/Grid/Grid';
import { Scoreboard } from '../../components/Scoreboard';
import { Top } from '../../components/Top';

import { GameLevel, LevelNames } from './GameSettings';
import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
	const {
		level,
		gameIsOver,
		isWin,
		settings,
		playerField,
		flagCounter,
		onClick,
		onChangeLevel,
		onReset,
		onContextMenu,
		time,
	} = useGame();

	const [, bombs] = settings;

	const onChangeLevelHandler = useCallback(
		({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
			onChangeLevel(level as LevelNames);
		},
		[level]
	);

	return (
		<Wrapper>
			<Top />
			<GameArea>
				<Scoreboard
					time={String(time)}
					mines={String(bombs - flagCounter)}
					levels={GameLevel as unknown as string[]}
					defaultLevel={level}
					onChangeLevel={onChangeLevelHandler}
					onReset={onReset}
				/>
				{gameIsOver && <GameOver onClick={onReset} isWin={isWin} />}
				<Grid onClick={onClick} onContextMenu={onContextMenu}>
					{playerField}
				</Grid>
			</GameArea>
		</Wrapper>
	);
};
