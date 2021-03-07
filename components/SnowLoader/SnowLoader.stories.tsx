import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { SnowLoader } from "./SnowLoader";

export default {
  title: "SnowLoader",
  component: SnowLoader,
} as Meta;

const Template: Story<typeof SnowLoader> = (args) => <SnowLoader {...args} />;

export const Base = Template.bind({});
