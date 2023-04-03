import { FC } from 'react';
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
		onClick,
		onChangeLevel,
		onReset,
	} = useGame();

	const [, bombs] = settings;

	return (
		<Wrapper>
			<Top />
			<GameArea>
				<Scoreboard
					time='1200'
					mines={bombs + ''}
					levels={GameLevel as unknown as string[]}
					defaultLevel={level}
					onChangeLevel={({ target: { value: level } }) => {
						onChangeLevel(level as LevelNames);
					}}
					onReset={onReset}
				/>
				{gameIsOver && <GameOver onClick={onReset} isWin={isWin} />}
				<Grid onClick={onClick} onContextMenu={() => {}}>
					{playerField}
				</Grid>
			</GameArea>
		</Wrapper>
	);
};
