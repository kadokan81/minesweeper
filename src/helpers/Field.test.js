import { emptyFieldGenerator, CellState, fieldGenerator } from './Field';

const { empty, hidden, bomb } = CellState;
describe('Field Generator', () => {
	describe('emptyFieldGenerator tests', () => {
		it('2*2', () => {
			expect(emptyFieldGenerator(2)).toStrictEqual([
				[empty, empty],
				[empty, empty],
			]);
		});
		it('3*3', () => {
			expect(emptyFieldGenerator(3)).toStrictEqual([
				[empty, empty, empty],
				[empty, empty, empty],
				[empty, empty, empty],
			]);
		});
		it('3*3 with hidden state', () => {
			expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
				[hidden, hidden, hidden],
				[hidden, hidden, hidden],
				[hidden, hidden, hidden],
			]);
		});
	});
	describe('Simple cases', () => {
		it('Wrong density', () => {
			const errorText = 'Density must be between 0 and 1';
			expect(() => fieldGenerator(1, -1)).toThrow(errorText);
			expect(() => fieldGenerator(1, 2)).toThrow(errorText);
		});
	});
	describe('fieldGenerator', () => {
		it('Smallest possible field without mine', () => {
			expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
		});
		it('Big field without mine', () => {
			expect(fieldGenerator(10, 0)).toStrictEqual([
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
				[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
			]);
		});
		it('Smallest possible field with mine', () => {
			expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
		});
		it('2*2 field with mine', () => {
			expect(fieldGenerator(2, 1)).toStrictEqual([
				[bomb, bomb],
				[bomb, bomb],
			]);
		});

		it('2*2 field with 50% mine ', () => {
			const field = fieldGenerator(2, 0.5);
			const flatField = field.flat();

			const sellWithBombs = flatField.filter((cell) => cell === bomb);
			const emptySellWithBombs = flatField.filter((cell) => cell === 2);
			expect(sellWithBombs).toHaveLength(2);
			expect(emptySellWithBombs).toHaveLength(2);
		});
		// it('4*4 field with 50% mine ', () => {
		// 	const field = fieldGenerator(4, 0.5);
		// 	const flatField = field.flat();
		// 	console.log('field', field);
		// 	console.log('Flat field', flatField);

		// 	const sellWithBombs = flatField.filter((cell) => cell === bomb);
		// 	const emptySellWithBombs = flatField.filter((cell) => cell === 4);
		// 	expect(sellWithBombs).toHaveLength(4);
		// 	expect(emptySellWithBombs).toHaveLength(4);
		// });
	});
});
