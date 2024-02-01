import { test, expect } from "vitest";

function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

test("should return 1 for 0", () => {
  expect(factorial(0)).toBe(1);
});

test("should return 120 for 5", () => {
  expect(factorial(5)).toBe(120);
});
