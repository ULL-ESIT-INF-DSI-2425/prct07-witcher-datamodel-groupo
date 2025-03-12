import { describe, it, expect } from "vitest";
import { Merchant } from "../../src/models/merchant.ts";
import { MerchantType } from "../../src/enums/type.ts";
import { Locations } from "../../src/enums/locations.ts";

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
});

