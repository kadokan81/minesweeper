import styled from '@emotion/styled';
import React, { FC } from 'react';
import { GameName } from './GameName';
import { Legend } from './Legend';

export const Top: FC = () => {
	return (
		<Header>
			<GameName>MineSweeper</GameName>
			<Legend />
		</Header>
	);
};

const Header = styled.header`
	text-align: center;
	position: relative;
	display: inline-block;
`;
