import { describe, expect, test } from "vitest";
import { add } from "../../src/example/basicFunctions";

describe("add function tests", () => {
  test("add(1,8) returns 9", () => {
    expect(add(1, 8)).toBe(9);
  });

  test("add(-9,7) returns -2", () => {
    expect(add(-9, 7)).toBe(-2);
  });
});
