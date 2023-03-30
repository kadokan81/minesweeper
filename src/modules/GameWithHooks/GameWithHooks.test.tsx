import { screen } from '@storybook/testing-library';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameWithHooks } from './GameWithHooks';

describe('Game with hooks test cases', () => {
	describe('Render behavior', () => {
		it('render game field by default', () => {
			const { asFragment } = render(<GameWithHooks />);

			expect(screen.getAllByRole('cell')).toHaveLength(81);

			expect(asFragment).toMatchSnapshot();
		});
		it('onChange game level handler', () => {
			render(<GameWithHooks />);
			expect(screen.getAllByRole('cell')).toHaveLength(81);

			userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
			expect(screen.getAllByRole('cell')).toHaveLength(256);

			userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
			expect(screen.getAllByRole('cell')).toHaveLength(484);
		});
	});
});
