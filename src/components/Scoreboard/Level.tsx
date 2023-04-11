import styled from '@emotion/styled';
import { ChangeEvent, FC, memo } from 'react';

export interface LevelProps {
	/**
	 * Array of possible game level
	 */
	children: string[];
	value?: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Level: FC<LevelProps> = memo(({ children, value, onChange }) => (
	<Select onChange={onChange} value={value}>
		{children.map((item: string) => (
			<Option key={item} value={item}>
				{item}
			</Option>
		))}
	</Select>
));
Level.displayName = 'Level';

const Select = styled.select`
	margin: 0;
	height: 100%;
	border-radius: 0;
	border: 0.15vw solid;
	border-color: white #9e9e9e #9e9e9e white;
	background-color: #d1d1d1;
	padding: 0.4vw 0.3vw;
`;

const Option = styled.option`
	font-weight: normal;
	display: block;
	white-space: nowrap;
	min-height: 1.2em;
	padding: 0 0.2vw 0.2vw;
`;
