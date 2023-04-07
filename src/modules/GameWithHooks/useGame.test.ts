import { act, renderHook } from '@testing-library/react';

import { useGame } from './useGame';
import { GameLevel, GameSettings } from './GameSettings';

import { CellState } from '../../helpers/CellManipulation';
import { Field } from '../../helpers/Field';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const [beginner, intermediate, expert] = GameLevel;
const flatWithFilter = (field: Field, cond: number) =>
	field.flat().filter((v) => v === cond);

// jest.mock('../../helpers/Field');

describe('useGame hook test', () => {
	describe('render behavior', () => {
		it('render hook by default', () => {
			const { result } = renderHook(useGame);
			const { level, gameIsOver, isWin, settings, playerField, gameField } =
				result.current;

			expect({ level, gameIsOver, isWin, settings }).toStrictEqual({
				level: beginner,
				gameIsOver: false,
				isWin: false,
				settings: GameSettings.beginner,
			});
			expect(playerField).toHaveLength(9);
			expect(flatWithFilter(gameField, b)).toHaveLength(10);
		});
		it('onChange game level  handler', () => {
			const { result } = renderHook(useGame);
			const { playerField: beginnerPlayerField, onChangeLevel } =
				result.current;
			expect(beginnerPlayerField).toHaveLength(9);

			act(() => onChangeLevel(expert));

			const { playerField: expertPlayerField } = result.current;
			expect(expertPlayerField).toHaveLength(22);
		});
	});

	describe('Open Cell test cases', () => {
		it('Open empty cell on the beginner level', () => {
			const { result } = renderHook(useGame);

			const { playerField, onClick } = result.current;

			expect(playerField).toHaveLength(9);
			expect(flatWithFilter(playerField, e)).toHaveLength(0);

			act(() => onClick([0, 0]));

			const { playerField: newPlayerField } = result.current;
		});
	});
	describe('`scoreboard behavior - time and bomb count', () => {
		it('timer should start by click to a cell ', () => {
			jest.useFakeTimers();
			const { result } = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(0);

			act(() => {
				result.current.onContextMenu([0, 0]);
			});
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(timeMustPass);
		});
		it('timer should start by mark cell is a flag ', () => {
			jest.useFakeTimers();
			const { result } = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(0);

			act(() => {
				result.current.onClick([0, 0]);
			});
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(timeMustPass);
		});
		it('timer should reset value when onReset have been  called ', () => {
			jest.useFakeTimers();
			const { result } = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(0);
			act(() => {
				result.current.onContextMenu([0, 0]);
			});
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				});
			}
			expect(result.current.time).toBe(timeMustPass);
			act(() => {
				result.current.onReset();
			});
			expect(result.current.time).toBe(0);
		});
	});
});
