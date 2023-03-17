import { fireEvent, render, screen } from '@testing-library/react';
import { FC } from 'react';
import { Reset } from './Reset';

describe('Reset button check ', () => {
	const ResetWithDummyDummyHandlerOnReset: FC = () => (
		<Reset onReset={() => {}} />
	);

	it('Should render element with default state', () => {
		render(<ResetWithDummyDummyHandlerOnReset />);
		expect(screen.getByText('🙂')).toBeInTheDocument();
	});
	it('onReset handler should be called', () => {
		const onReset = jest.fn();
		render(<Reset onReset={onReset} />);
		fireEvent.click(screen.getByText('🙂'));
		expect(onReset).toBeCalled();
	});
	it('Should change state when onMouseDown and onMouseUp events happened', () => {
		render(<ResetWithDummyDummyHandlerOnReset />);
		const btn = screen.getByText('🙂');
		fireEvent.mouseDown(btn);
		expect(screen.getByText('😯')).toBeInTheDocument();
		fireEvent.mouseUp(btn);
		expect(screen.getByText('🙂')).toBeInTheDocument();
	});
	it('Should change state when onMouseDown and onMouseLeave events happened', () => {
		render(<ResetWithDummyDummyHandlerOnReset />);
		const btn = screen.getByText('🙂');
		fireEvent.mouseDown(btn);
		expect(screen.getByText('😯')).toBeInTheDocument();
		fireEvent.mouseLeave(btn);
		expect(screen.queryByText('😯')).not.toBeInTheDocument();
		expect(screen.getByText('🙂')).toBeInTheDocument();
	});
});
