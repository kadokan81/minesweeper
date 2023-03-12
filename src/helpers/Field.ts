import { incrementNeighbors } from './CellManipulation';
export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];

export const CellState: Record<string, Cell> = {
	empty: 0,
	bomb: 9,
	hidden: 10,
	mark: 11,
	weakMark: 12,
};
export type Coords = [number, number];

export const emptyFieldGenerator = (
	size: number,
	state: Cell = CellState.empty
): Field => new Array(size).fill(null).map(() => new Array(size).fill(state));

export const fieldGenerator = (size: number, probability: number): Field => {
	if (probability < 0 || probability > 1) {
		throw new Error('Density must be between 0 and 1');
	}
	const result: Field = emptyFieldGenerator(size);

	let unprocessedCells = size * size;
	let restCellWithBombs = unprocessedCells * probability;

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (restCellWithBombs === 0) {
				return result;
			}

			if (restCellWithBombs / unprocessedCells > Math.random()) {
				result[y][x] = CellState.bomb;
				incrementNeighbors([y, x], result);
				restCellWithBombs--;
			}
			unprocessedCells--;
		}
	}

	return result;
};
