import { describe, it, expect } from "vitest";
import { AppError } from "../../src/errors/apperror.js";

describe("AppError class", () => {
  it("Should be defined", () => {
    expect(AppError).toBeDefined();
  });
  it("Should create a new instance of AppError", () => {
    const error = new AppError("Error message");
    expect(error).toBeInstanceOf(AppError);
  });

});