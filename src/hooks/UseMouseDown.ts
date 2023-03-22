import { useDebugValue, useState } from 'react';
export type setMouseDownStatus = () => void;
export type setMouseUpStatus = () => void;

export const useMouseDown = (): [
	boolean,
	setMouseDownStatus,
	setMouseUpStatus
] => {
	const [mouseDown, setMouseDown] = useState(false);

	useDebugValue(
		`mouseDown: ${mouseDown}`,
		(str) => `${str} ${new Date().toISOString()}`
	);

	const onMouseDown = () => setMouseDown(true);
	const onMouseUp = () => setMouseDown(false);

	return [mouseDown, onMouseDown, onMouseUp];
};
