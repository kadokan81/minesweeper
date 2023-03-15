import styled from '@emotion/styled';

export interface GameNameProps {
	/**
	 * String to be render
	 */
	children: string;
}
export const GameName = styled.h1<GameNameProps>`
	font-family: 'Roboto';
	font-size: 2em;
	font-weight: 700;
	text-transform: uppercase;
`;
