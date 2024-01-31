import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders APP with Header", () => {
    render(<App />);
    expect(screen.getByText("NASA's Open Data Portal")).toBeInTheDocument();
  });
});

describe("App Snapshot", () => {
  it("renders App vs Snapshot", () => {
    render(<App />);
    expect(screen).toMatchSnapshot();
  });
});

// const cy = require("cypress");

// test("should be able to add items into favorites", () => {
//   cy.visit("http://localhost:5173");
//   cy.click("Aachen");
//   cy.click("Add to Favorites");
//   cy.click("Favorites");
//   cy.contains("Aachen");
// });

// test("should be able to remove items from favorites", () => {
//   cy.visit("http://localhost:5173");
//   cy.click("Aachen");
//   cy.click("Add to Favorites");
//   cy.click("Favorites");
//   cy.contains("Aachen");
//   cy.click("Remove from Favorites");
//   cy.contains("Aachen").should("not.exist");
// });
