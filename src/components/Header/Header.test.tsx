import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders Header", () => {
    render(<Header />);
    screen.debug();
  });
});

describe("Header Snapshot", () => {
  it("renders Header vs Snapshot", () => {
    render(<Header />);
    expect(screen).toMatchSnapshot();
  });
});
