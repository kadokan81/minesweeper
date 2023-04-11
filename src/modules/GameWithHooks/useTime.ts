import { useEffect, useState } from 'react';

export const useTime = (
	isGameStarted: boolean,
	gameIsOver: boolean
): [time: number, onReset: () => void] => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isGameStarted) {
			interval = setTimeout(() => {
				setTime((time) => time + 1);
			}, 1000);

			if (gameIsOver) {
				clearInterval(interval);
			}
		}

		return () => {
			clearInterval(interval);
		};
	}, [isGameStarted, gameIsOver, time]);

	const onReset = () => setTime(0);

	return [time, onReset];
};
