import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellState } from '../../helpers/CellManipulation';
import { GameWithHooks } from './GameWithHooks';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const mockOnClick = jest.fn();
const mockOnChangeLevel = jest.fn();
const mockOnReset = jest.fn();
jest.mock('./useGame', () => ({
	__esModule: true,
	useGame: () => ({
		level: 'beginner',
		gameIsOver: true,
		isWin: false,
		settings: [9, 10],
		playerField: [
			[10, 10],
			[10, 10],
		],
		onClick: mockOnClick,
		onChangeLevel: mockOnChangeLevel,
		onReset: mockOnReset,
	}),
}));
beforeEach(() => {
	jest.clearAllMocks();
});

describe('Game with hooks test cases', () => {
	describe('Render behavior', () => {
		it('render game field by default', () => {
			const { asFragment } = render(<GameWithHooks />);

			expect(asFragment).toMatchSnapshot();
		});
		it('Cell click works fine', () => {
			render(<GameWithHooks />);
			userEvent.click(screen.getByTestId('0,0'));
			expect(mockOnClick).toBeCalled();
		});
		it('Click reset button', () => {
			render(<GameWithHooks />);
			userEvent.click(screen.getByRole('button'));
			expect(mockOnReset).toBeCalled();
		});
		it('change level works fine', () => {
			render(<GameWithHooks />);
			userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
			expect(mockOnChangeLevel).toBeCalled();
		});
		it('game over reset the game state', () => {
			render(<GameWithHooks />);
			userEvent.click(screen.getByText('🙁'));
			expect(mockOnReset).toBeCalled();
		});
	});
});
