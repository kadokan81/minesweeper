import { Story, Meta } from '@storybook/react';
import { Counter, CounterProps } from './Counter';

export default {
	title: 'Scoreboard/GameName',
	component: Counter,
} as Meta;

const Template: Story<CounterProps> = (args) => <Counter {...args} />;

export const CounterExample = Template.bind({});
CounterExample.args = {
	children: '010',
};
