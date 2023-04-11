import {
	CellState,
	emptyFieldGenerator,
	fieldGenerator,
	Coords,
} from './../../helpers/Field';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Field } from '../../helpers/Field';
import { GameSettings, LevelNames } from './GameSettings';
import { openCell } from '../../helpers/openCell';
import { setFlag } from '../../helpers/setFlag';
import { log } from 'console';
import { useTime } from './useTime';

type returnType = {
	level: 'beginner' | 'intermediate' | 'expert';
	gameIsOver: boolean;
	isWin: boolean;
	settings: number[];
	playerField: Field;
	gameField: Field;
	flagCounter: number;
	time: number;
	onClick: (coords: Coords) => void;
	onChangeLevel: (level: LevelNames) => void;
	onReset: () => void;
	onContextMenu: (coords: Coords) => void;
};

export const useGame = (): returnType => {
	const [level, setLevel] = useState<LevelNames>('beginner');
	const [gameIsOver, setGAmeIsOver] = useState(false);
	const [isWin, setIsWin] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);

	const [size, bombs] = GameSettings[level];

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	);
	const [gameField, setGameField] = useState<Field>(
		fieldGenerator(size, bombs / (size * size))
	);

	const [time, onResetTime] = useTime(isGameStarted, gameIsOver);

	useMemo(() => console.log(gameField), [gameField]);

	const [flagCounter, setFlagCounter] = useState(0);

	const onContextMenu = useCallback(
		(coords: Coords) => {
			!isGameStarted && setIsGameStarted(true);

			const [newPlayerField, isSolved, newFlagCounter] = setFlag(
				coords,
				playerField,
				gameField,
				flagCounter,
				bombs
			);
			setFlagCounter(newFlagCounter);
			if (isSolved) {
				setIsWin(isSolved);
				setGAmeIsOver(isSolved);
			}
			setPlayerField([...newPlayerField]);
		},
		[isGameStarted, gameIsOver, isWin, level, flagCounter]
	);

	const onReset = useCallback(() => {
		const newGameField = fieldGenerator(size, bombs / (size * size));
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

		setGameField([...newGameField]);
		setPlayerField([...newPlayerField]);
		setGAmeIsOver(false);
		onResetTime();
		setIsGameStarted(false);
	}, [size, bombs]);

	const onClick = useCallback(
		(coords: Coords) => {
			!isGameStarted && setIsGameStarted(true);

			try {
				const [newPlayerField, isSolved, flagCounter] = openCell(
					coords,
					playerField,
					gameField
				);

				if (isSolved) {
					setIsWin(isSolved);
					setGAmeIsOver(isSolved);
				}
				setPlayerField([...newPlayerField]);
			} catch {
				setPlayerField([...gameField]);
				setGAmeIsOver(true);
				setIsWin(false);
			}
		},
		[isGameStarted, gameIsOver, isWin, level, flagCounter]
	);
	const onChangeLevel = (level: LevelNames = 'beginner') => {
		setLevel(level);

		const [size, bombs] = GameSettings[level];
		const newGameField = fieldGenerator(size, bombs / (size * size));
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

		setGameField([...newGameField]);
		setPlayerField([...newPlayerField]);
		setGAmeIsOver(false);
		onResetTime();
		setIsGameStarted(false);
	};
	return {
		level,
		gameIsOver,
		isWin,
		settings: [size, bombs],
		playerField,
		gameField,
		flagCounter,
		onClick,
		onChangeLevel,
		onReset,
		onContextMenu,
		time,
	};
};
