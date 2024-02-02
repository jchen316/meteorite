import { render, screen } from "@testing-library/react";
import TextTyper from "./TextTyper";

test("renders TextTyper", () => {
  render(<TextTyper text="taco" interval={100} />);
  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
});

test("renders empty string initially", () => {
  render(<TextTyper text="taco" interval={100} />);
  const listItem = screen.getByRole("listitem");
  expect(listItem.textContent).toBe("");
});

test("renders typed text after interval", async () => {
  render(<TextTyper text="taco" interval={100} />);
  await new Promise((r) => setTimeout(r, 500));
  const listItem = screen.getByRole("listitem");
  expect(listItem.textContent).toBe("taco");
});
