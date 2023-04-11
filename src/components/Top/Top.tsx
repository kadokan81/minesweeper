import styled from '@emotion/styled';
import React, { FC, memo } from 'react';
import { GameName } from './GameName';
import { Legend } from './Legend';

export const Top: FC = memo(() => {
	return (
		<Header>
			<GameName>MineSweeper</GameName>
			<Legend />
		</Header>
	);
});
Top.displayName = 'Top';

const Header = styled.header`
	text-align: center;
	position: relative;
	display: inline-block;
`;
