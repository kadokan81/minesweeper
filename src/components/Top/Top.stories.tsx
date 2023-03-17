import { Story, Meta } from '@storybook/react';
import { Top } from './Top';

export default {
	title: 'Top/Top',
	component: Top,
} as Meta;

const Template: Story = (args) => <Top {...args} />;

export const TopHeader = Template.bind({});
