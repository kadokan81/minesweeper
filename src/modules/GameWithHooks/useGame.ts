import {
	CellState,
	emptyFieldGenerator,
	fieldGenerator,
	Coords,
} from './../../helpers/Field';
import { useEffect, useMemo, useState } from 'react';
import { Field } from '../../helpers/Field';
import { GameSettings, LevelNames } from './GameSettings';
import { openCell } from '../../helpers/openCell';
import { setFlag } from '../../helpers/setFlag';
import { log } from 'console';

type returnType = {
	level: 'beginner' | 'intermediate' | 'expert';
	gameIsOver: boolean;
	isWin: boolean;
	settings: number[];
	playerField: Field;
	gameField: Field;
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

	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isGameStarted) {
			interval = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);

			if (gameIsOver) {
				clearInterval(interval);
			}
		}

		return () => {
			clearInterval(interval);
		};
	}, [isGameStarted, gameIsOver, time]);

	useMemo(() => console.log(gameField), [gameField]);
	useMemo(() => console.log(time), [time]);

	const onContextMenu = (coords: Coords) => {
		!isGameStarted && setIsGameStarted(true);

		const [newPlayerField, isSolved, flagCounter] = setFlag(
			coords,
			playerField,
			gameField
		);
		if (isSolved) {
			setIsWin(isSolved);
			setGAmeIsOver(isSolved);
		}
		setPlayerField([...newPlayerField]);
	};

	const onReset = () => {
		const newGameField = fieldGenerator(size, bombs / (size * size));
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

		setGameField([...newGameField]);
		setPlayerField([...newPlayerField]);
		setGAmeIsOver(false);
		setTime(0);
		setIsGameStarted(false);
	};

	const onClick = (coords: Coords) => {
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
	};
	const onChangeLevel = (level: LevelNames = 'beginner') => {
		setLevel(level);

		const [size, bombs] = GameSettings[level];
		const newGameField = fieldGenerator(size, bombs / (size * size));
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

		setGameField([...newGameField]);
		setPlayerField([...newPlayerField]);
		setGAmeIsOver(false);
		setTime(0);
		setIsGameStarted(false);
	};
	return {
		level,
		gameIsOver,
		isWin,
		settings: [size, bombs],
		playerField,
		gameField,
		onClick,
		onChangeLevel,
		onReset,
		onContextMenu,
		time,
	};
};
