import { renderHook, act } from '@testing-library/react';
import { useMouseDown } from './UseMouseDown';
describe('UseMouseDown hook test', () => {
	it('Should toggle state after onMouseDown/onMouseUo calls', () => {
		const { result } = renderHook(useMouseDown);
		const [mouseDown, onMouseDown, onMouseUp] = result.current;

		expect(mouseDown).toBe(false);

		act(onMouseDown);
		expect(result.current[0]).toBe(true);

		act(onMouseUp);
		expect(result.current[0]).toBe(false);

		act(onMouseDown);
		expect(result.current[0]).toBe(true);
	});
});
