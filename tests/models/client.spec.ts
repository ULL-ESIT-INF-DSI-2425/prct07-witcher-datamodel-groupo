import { describe, it, expect } from "vitest";
import { Client } from "../../src/models/client.js";
import { Races } from "../../src/enums/races.js";
import { Locations } from "../../src/enums/locations.js";
import { AppError } from "../../src/errors/apperror.js";

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
    expect(client.id).toBe(1);
    expect(client.name).toBe("Geralt");
    expect(client.race).toBe(Races.WITCHER);
    expect(client.location).toBe(Locations.KAER_MORHEN);
  });

  it("should throw RaceError for invalid race", () => {
    expect(() => {
      new Client(1, "Geralt", "INVALID_RACE" as Races, Locations.KAER_MORHEN);
    }).toThrow('We do not serve your kind here!');
  });

  it("should throw LocationError for invalid location", () => {
    expect(() => {
      new Client(1, "Geralt", Races.WITCHER, "INVALID_LOCATION" as Locations);
    }).toThrowError("I have no idea where that is! You might as well be from the Moon!");
  });

  it("should throw IdError for invalid id", () => {
    expect(() => {
      new Client(-1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    }).toThrow("As you know the id must be a positive integer. Do not waste my time!");
  });
});
