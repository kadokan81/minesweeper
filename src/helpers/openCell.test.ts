import { CellState } from './CellManipulation';
import { openCell } from './openCell';
const { empty: e, hidden: h, bomb: b } = CellState;

describe('open cell action', () => {
	describe('Simple case with lose', () => {
		it('opens sell with the bomb', () => {
			expect(() =>
				openCell(
					[1, 1],
					[
						[h, h],
						[h, h],
					],
					[
						[1, 1],
						[1, b],
					]
				)
			).toThrow('Game Over');
		});
	});
	describe('Open sell with number', () => {
		it('opens sell state === 1', () => {
			const [playerField] = openCell(
				[1, 1],
				[
					[h, h, h],
					[h, h, h],
					[h, h, h],
				],
				[
					[1, 1, 0],
					[9, 1, 0],
					[1, 1, 0],
				]
			);
			expect(playerField).toStrictEqual([
				[h, h, h],
				[h, 1, h],
				[h, h, h],
			]);
		});
		it('opens sell state === 3', () => {
			const [playerField] = openCell(
				[1, 1],
				[
					[h, h, h],
					[h, h, h],
					[h, h, h],
				],
				[
					[9, 2, 0],
					[9, 3, 0],
					[9, 2, 0],
				]
			);
			expect(playerField).toStrictEqual([
				[h, h, h],
				[h, 3, h],
				[h, h, h],
			]);
		});
	});
	describe('Open empty cell', () => {
		it('open empty cell, simple 3*3 case', () => {
			const [playerField] = openCell(
				[1, 2],
				[
					[h, h, h],
					[h, h, h],
					[h, h, h],
				],
				[
					[1, 1, 0],
					[9, 1, 0],
					[1, 1, 0],
				]
			);
			expect(playerField).toStrictEqual([
				[h, 1, 0],
				[h, 1, 0],
				[h, 1, 0],
			]);
		});
		it('Open empty cell 5*5 case', () => {
			const [playerField] = openCell(
				[2, 2],
				[
					[h, h, h, h, h],
					[h, h, h, h, h],
					[h, h, h, h, h],
					[h, h, h, h, h],
					[h, h, h, h, h],
				],
				[
					[9, 9, 1, 1, 2],
					[9, 3, 1, 0, 0],
					[1, 1, 0, 1, 1],
					[1, 0, 0, 1, 9],
					[2, 1, 0, 1, 0],
				]
			);
			expect(playerField).toStrictEqual([
				[h, h, 1, 1, 2],
				[h, 3, 1, 0, 0],
				[1, 1, 0, 1, 1],
				[1, 0, 0, 1, h],
				[2, 1, 0, 1, h],
			]);
		});
	});
});
