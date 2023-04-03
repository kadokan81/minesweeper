import { CellState } from './CellManipulation';
import { Field } from './Field';
import { setFlag } from './setFlag';
const { flag: f, weakFlag: w, hidden: h, empty: e, bomb: b } = CellState;

describe('set flag action', () => {
	describe('set flag to the cell check', () => {
		it('set flag to the non hidden cell should be ignored', () => {
			const gameField: Field = [
				[1, 1, e],
				[b, 1, e],
				[1, 1, e],
			];
			const playerField: Field = [
				[1, h, h],
				[h, h, h],
				[h, h, h],
			];
			const newPlayerField = setFlag([0, 0], playerField, gameField);

			expect(newPlayerField).toStrictEqual([
				[1, h, h],
				[h, h, h],
				[h, h, h],
			]);
		});
		it('set flag action simple 3*3', () => {
			const gameField: Field = [
				[1, 1, e],
				[b, 1, e],
				[1, 1, e],
			];
			const playerField: Field = [
				[h, h, h],
				[h, h, h],
				[h, h, h],
			];
			const playersFieldAfterFirstClick = setFlag(
				[0, 0],
				playerField,
				gameField
			);
			expect(playersFieldAfterFirstClick).toStrictEqual([
				[f, h, h],
				[h, h, h],
				[h, h, h],
			]);
			const playerFieldAfterSecondClick = setFlag(
				[0, 0],
				playerField,
				gameField
			);
			expect(playerFieldAfterSecondClick).toStrictEqual([
				[w, h, h],
				[h, h, h],
				[h, h, h],
			]);
			const playerFieldAfterThirdClick = setFlag(
				[0, 0],
				playerField,
				gameField
			);
			expect(playerFieldAfterThirdClick).toStrictEqual([
				[h, h, h],
				[h, h, h],
				[h, h, h],
			]);
		});
	});
});
