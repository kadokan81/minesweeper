import {
	CellState,
	emptyFieldGenerator,
	fieldGenerator,
	Coords,
} from './../../helpers/Field';
import { useState } from 'react';
import { Field } from '../../helpers/Field';
import { GameSettings, LevelNames } from './GameSettings';
import { openCell } from '../../helpers/openCell';
import { setFlag } from '../../helpers/setFlag';

type returnType = {
	level: 'beginner' | 'intermediate' | 'expert';
	gameIsOver: boolean;
	isWin: boolean;
	settings: number[];
	playerField: Field;
	onClick: (coords: Coords) => void;
	onChangeLevel: (level: LevelNames) => void;
	onReset: () => void;
	onContextMenu: (coords: Coords) => void;
};

export const useGame = (): returnType => {
	const [level, setLevel] = useState<LevelNames>('beginner');
	const [gameIsOver, setGAmeIsOver] = useState(false);
	const [isWin, setIsWin] = useState(true);

	const [size, bombs] = GameSettings[level];

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	);
	const [gameField, setGameField] = useState<Field>(
		fieldGenerator(size, bombs / (size * size))
	);

	const onContextMenu = (coords: Coords) => {
		const newPlayerField = setFlag(coords, playerField, gameField);
		setPlayerField(newPlayerField);
	};

	const onReset = () => {
		const newGameField = fieldGenerator(size, bombs / (size * size));
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

		setGameField([...newGameField]);
		setPlayerField([...newPlayerField]);
		setGAmeIsOver(false);
	};

	const onClick = (coords: Coords) => {
		try {
			const newPlayerField = openCell(coords, playerField, gameField);
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
	};
	return {
		level,
		gameIsOver,
		isWin,
		settings: [size, bombs],
		playerField,
		onClick,
		onChangeLevel,
		onReset,
		onContextMenu,
	};
};
