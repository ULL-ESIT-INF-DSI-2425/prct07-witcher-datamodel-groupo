import { describe, it, expect } from "vitest";
import { Merchant } from "../../src/models/merchant.js";
import { MerchantType } from "../../src/enums/merchantType.js";
import { Locations } from "../../src/enums/locations.js";
import { AppError } from "../../src/errors/apperror.js";
import { MerchantError } from "../../src/errors/merchanterror.js";

describe("Merchant class", () => {
  it("Should create a new MerchantError instance", () => {
    const error = new MerchantError("Invalid merchant type");
    expect(error).toBeInstanceOf(MerchantError);
    expect(error.message).toBe("Invalid merchant type");
  });

  it("Should throw an error if the merchantType is not valid", () => {
    expect(() => new Merchant(1, "Éibhear Hattori", "BLACKSMIT" as MerchantType, Locations.NOVIGRAD))
    .toThrowError(AppError);
    expect(() => {
      new Merchant(1, "Ciri", "Fighter" as MerchantType , Locations.KAER_MORHEN);
    }).toThrow('That is not a job! Jokers are not allowed in this Inn!');
    expect(() => {
      new Merchant(1, "Ciri", "Medianero" as MerchantType , Locations.KAER_MORHEN);
    }
    ).toThrowError('That is not a job! Jokers are not allowed in this Inn!');
  });
});