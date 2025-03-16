import { describe, it, expect } from "vitest";
import { Client } from "../../src/models/client.js";
import { Races } from "../../src/enums/races.js";
import { Locations } from "../../src/enums/locations.js";

describe("Client class", () => {
  it("Should be defined", () => {
    expect(Client).toBeDefined();
  });
  it("should create a client with valid attributes", () => {
    const client = new Client(
      1,
      "Geralt",
      Races.WITCHER,
      Locations.KAER_MORHEN,
    );

    expect(client).toBeInstanceOf(Client);
    expect(client._id).toBe(1);
    expect(client._name).toBe("Geralt");
    expect(client._race).toBe(Races.WITCHER);
    expect(client._location).toBe(Locations.KAER_MORHEN);
  });

});
