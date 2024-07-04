import { describe, it, expect } from "vitest";
import { validateUsername, validatePassword } from "../src/validation/validate.js";

describe("validateUsername tests", () => {
  it("should return true for a valid username", () => {
    const validUsername = "john_doe123";
    expect(validateUsername(validUsername)).toBe(true);
  });

  it("should return false for an invalid username", () => {
    const invalidUsername = "john.doe";
    expect(validateUsername(invalidUsername)).toBe(false);
  });
});

describe("validatePassword tests", () => {
  it("should return true for a valid password", () => {
    const validPassword = "Password123!";
    expect(validatePassword(validPassword)).toBe(true);
  });

  it("should return false for an invalid password", () => {
    const invalidPassword = "password";
    expect(validatePassword(invalidPassword)).toBe(false);
  });
});
