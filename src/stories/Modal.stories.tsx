import { useState } from "react";
import { Meta } from "@storybook/react";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
