import { expect, test, describe } from "vitest";
import { normalizeString, decomposeLabel } from "./strings";

describe("normalizeString", () => {
  test("it should normalize special characters", () => {
    expect(normalizeString("Atlético")).toBe("atletico");
  });

  test("it should return lowercase for uppercase strings", () => {
    expect(normalizeString("UPPERCASE")).toBe("uppercase");
  });
});

describe("decomposeLabel", () => {
  test("it should decompose label correctly", () => {
    expect(decomposeLabel("Atlético", "tle")).toEqual(["A", "tlé", "tico"]);
  });

  test("it should return full label if query is not found", () => {
    expect(decomposeLabel("Atlético", "xyz")).toEqual(["Atlético", "", ""]);
  });
});
