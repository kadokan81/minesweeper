import styled from '@emotion/styled';

import { FC } from 'react';

export interface LegendProps {
	/**
	 * Tag render string
	 */
	feature?: string;
	/**
	 * First action  String
	 */
	firstAction?: string;
	/**
	 * Second action  String
	 */
	secondAction?: string;
}

export const Legend: FC<LegendProps> = ({
	feature = 'flag',
	firstAction = 'alt',
	secondAction = 'ctrl',
}) => {
	return (
		<Parent>
			<strong>{feature}: </strong>
			<FlagComboParent>
				<FirstAction> {firstAction}</FirstAction> +{' '}
				<SecondAction> {secondAction}</SecondAction>
			</FlagComboParent>
		</Parent>
	);
};

const FlagComboParent = styled.code`
	background: #e3e3e3;
`;

const Parent = styled.legend`
	font-size: 1em;
	margin: 0 auto 2vw;
	line-height: 1.25em;
`;
const FirstAction = styled.span`
	color: #ec433c;
`;
const SecondAction = styled.span`
	color: #2a48ec;
`;
