import { describe, it, expect } from "vitest";
import { Merchant } from "../../src/models/merchant.ts";
import { MerchantType } from "../../src/enums/merchantType.ts";
import { Locations } from "../../src/enums/locations.ts";
import { AppError } from "../../src/errors/apperror.ts";

describe("Merchant class", () => {
  it("Should be defined", () => {
    expect(Merchant).toBeDefined();
  });
  it("Should create a new instance of Merchant", () => {
    const merchant = new Merchant(1, "Éibhear Hattori", MerchantType.BLACKSMIT, Locations.NOVIGRAD);
    expect(merchant).toBeInstanceOf(Merchant);
    const merchant2 = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    expect(merchant2).toBeInstanceOf(Merchant);
  });

  it("should throw error for invalid id", () => {
    expect(() => {
      new Merchant(-1, "Geralt", MerchantType.GENERAL_MERCHANT, Locations.KAER_MORHEN);
    }).toThrow("As you know the id must be a positive integer. Do not waste my time!");
  });

  it("should throw error for invalid Merchant Type", () => {
    expect(() => {
      new Merchant(1, "Ciri", "Fighter" as MerchantType , Locations.KAER_MORHEN);
    }).toThrow('That is not a job! Jokers are not allowed in this Inn!');
  });
});

