import { Field, CellState } from './Field';

export const detectSolvePassel = (
	playerField: Field,
	gameField: Field
): [boolean, number] => {
	const { hidden, bomb, flag, weakFlag } = CellState;
	let bombCounter = 0;
	let flagCounter = 0;
	let detectedBombCounter = 0;
	let hiddenCounter = 0;
	for (const y of gameField.keys()) {
		for (const x of gameField[y].keys()) {
			const gameCell = gameField[y][x];
			const playerCell = playerField[y][x];

			if (playerCell === hidden) {
				hiddenCounter++;
			}
			if ([flag, weakFlag].includes(playerCell)) {
				flagCounter++;
			}
			if (gameCell === bomb) {
				bombCounter++;
			}
			if (playerCell === flag) {
				detectedBombCounter++;
			}
		}
	}

	const isSolved = hiddenCounter === 0 && detectedBombCounter === flagCounter;

	return [isSolved, flagCounter];
};
