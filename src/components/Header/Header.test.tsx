import { render, screen } from "@testing-library/react";
import Header from "./Header";
import ButtonAppBar from "./Header";

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

test("renders NASA logo", () => {
  render(<ButtonAppBar />);
  const logo = screen.getByAltText("Nasa logo");
  expect(logo).toBeInTheDocument();
});

test("does not render confetti by default", () => {
  render(<ButtonAppBar />);
  const confetti = screen.queryByText((content, node) =>
    node?.classList?.contains("confetti")
  );
  expect(confetti).not.toBeInTheDocument();
});
