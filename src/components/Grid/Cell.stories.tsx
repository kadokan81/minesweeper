import { Meta, Story } from '@storybook/react';
import { Cell, CellProps } from './Cell';

export default {
	title: 'Grid/Cell',
	component: Cell,
	argTypes: {
		coords: { defaultValue: [1, 1] },
	},
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;
export const ClosedCell = Template.bind({});
export const RevealedFrame = Template.bind({});
export const BombCell = Template.bind({});
export const FlagCell = Template.bind({});
export const WeekFlagCell = Template.bind({});
export const CellWithNumber1 = Template.bind({});
export const CellWithNumber2 = Template.bind({});
export const CellWithNumber3 = Template.bind({});
export const CellWithNumber4 = Template.bind({});
export const CellWithNumber5 = Template.bind({});
export const CellWithNumber6 = Template.bind({});
export const CellWithNumber7 = Template.bind({});
export const CellWithNumber8 = Template.bind({});

CellWithNumber1.args = {
	children: 1,
};
CellWithNumber2.args = {
	children: 2,
};

CellWithNumber3.args = {
	children: 3,
};
CellWithNumber4.args = {
	children: 4,
};
CellWithNumber5.args = {
	children: 5,
};
CellWithNumber6.args = {
	children: 6,
};

CellWithNumber7.args = {
	children: 7,
};
CellWithNumber8.args = {
	children: 8,
};

ClosedCell.args = {
	children: 10,
};
RevealedFrame.args = {
	children: 0,
};
BombCell.args = {
	children: 9,
};
FlagCell.args = {
	children: 11,
};
WeekFlagCell.args = {
	children: 12,
};
