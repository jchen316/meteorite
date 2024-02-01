import { Meta, StoryFn } from "@storybook/react";
import Timer from "./Timer";

export default {
  title: "Timer",
  component: Timer,
} as Meta;

const Template: StoryFn = () => {
  return <Timer endTime={50000} />;
};

export const Default = Template.bind({});
