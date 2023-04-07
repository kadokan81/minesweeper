import { detectSolvePassel } from './detectSolvePassel';
import { CellState, Field } from './Field';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

describe('detectSolvePassel function', () => {
	it('simple case 3*3', () => {
		const gameField: Field = [
			[1, 1, e],
			[b, 1, e],
			[1, 1, e],
		];
		const playerField: Field = [
			[1, 1, e],
			[f, 1, e],
			[1, 1, e],
		];

		const [isSolved, flagCounter] = detectSolvePassel(playerField, gameField);

		expect(isSolved).toBe(true);
		expect(flagCounter).toBe(1);
	});
	it('Wrong simple case 3*3', () => {
		const gameField: Field = [
			[1, 1, e],
			[b, 1, e],
			[1, 1, e],
		];
		const playerField: Field = [
			[1, 1, h],
			[h, 1, h],
			[1, 1, h],
		];

		const [isSolved, flagCounter] = detectSolvePassel(playerField, gameField);

		expect(isSolved).toBe(false);
		expect(flagCounter).toBe(0);
	});
});
