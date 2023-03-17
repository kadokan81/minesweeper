import { Meta, Story } from '@storybook/react';
import { Scoreboard, ScoreboardProps } from './Scoreboard';

export default {
	title: 'Scoreboard/Scoreboard',
	component: Scoreboard,
} as Meta;

const Template: Story<ScoreboardProps> = (args) => <Scoreboard {...args} />;
export const ScoreboardExample = Template.bind({});
ScoreboardExample.args = {
	levels: ['beginner', 'intermediate', 'expert'],
	mines: '020',
	time: '1200',
	onReset: () => {},
};
