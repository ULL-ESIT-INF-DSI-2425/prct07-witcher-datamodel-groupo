import { describe, it, expect } from "vitest";
import { Merchant } from "../../src/models/merchant.ts";
import { MerchantType } from "../../src/enums/merchantType.ts";
import { Locations } from "../../src/enums/locations.ts";

describe("Merchant class", () => {
  it("Should be defined", () => {
    expect(Merchant).toBeDefined();
  });
  it("Should create a new instance of Merchant", () => {
    const merchant = new Merchant(1, "Éibhear Hattori", MerchantType.BLACKSMIT, Locations.NOVIGRAD);
    expect(merchant).toBeInstanceOf(Merchant);
    expect(merchant._id).toBe(1);
    expect(merchant._name).toBe("Éibhear Hattori");
    expect(merchant._type).toBe(MerchantType.BLACKSMIT);
    expect(merchant._location).toBe(Locations.NOVIGRAD);
    const merchant2 = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    expect(merchant2).toBeInstanceOf(Merchant);
    expect(merchant2._id).toBe(2);
    expect(merchant2._name).toBe("Gremist");
    expect(merchant2._type).toBe(MerchantType.ALCHEMIST);
    expect(merchant2._location).toBe(Locations.SKELLIGE);
  });
});
