import { describe, it, expect } from "vitest";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { ClientSchema } from "../../src/types/clientschema.js";
import { DB_Client } from "../../src/db/db_clients.js";
import { Client } from "../../src/models/client.js";
import { Races } from "../../src/enums/races.js";
import { Locations } from "../../src/enums/locations.js";
import { ClientAlreadyExistsError } from "../../src/errors/clientalreadyexits.js";
import { NotInInventoryError } from "../../src/errors/notininventoryerror.js";

describe ("class DB_Clients tests", () => {

  const adapter = new JSONFile<ClientSchema>('./src/db/db_clients.json');
  const db = new Low<ClientSchema>(adapter, { clients: [] });
  const dbClients = new DB_Client(adapter, db);

  it('should be defined', () => {
    expect(dbClients).toBeDefined();
  });

  it('should have a property adapter', () => {
    expect(dbClients.adapter).toBeDefined();
  });

  it('should have a property db', () => {
    expect(dbClients.db).toBeDefined();
  });

  it('should have a property inventory', () => {
    expect(dbClients._inventory).toBeDefined();
  });

  it('should have a method to initialize the database', async () => {
    await dbClients.initDB();
    expect(dbClients).toBeDefined();
  });

  it('should have a method to read the inventory', async () => {
    await dbClients.readInventory();
    expect(dbClients).toBeDefined();
  });

  it('should have a method to write the inventory', async () => {
    await dbClients.writeInventory();
    expect(dbClients).toBeDefined();
  });

  it('should have a method to add a new client in the inventory', () => {
    let client = new Client(1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    dbClients.addClient(client);
    console.log("Estado del inventario de clientes:");
    console.log(dbClients._inventory);
    expect(dbClients._inventory.length).toBe(1);
    dbClients.writeInventory();
  });

  it('should dont add a new client in the inventory if the client already exists', () => {
    let client = new Client(1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    console.log("Estado del inventario de clientes al añadir el cliente repetido:");
    console.log(dbClients._inventory);
    dbClients.addClient(client);
    expect(() => (dbClients.addClient(client))).toThrow(ClientAlreadyExistsError);
  });

  it('should have a method to remove a client from the inventory', () => {
    let client = new Client(1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    dbClients.addClient(client);
    console.log("Estado del inventario de clientes al añadir el cliente:");
    console.log(dbClients._inventory);
    dbClients.removeClient(client);
    console.log("Estado del inventario de clientes al eliminar el cliente:");
    console.log(dbClients._inventory);
    expect(dbClients._inventory.length).toBe(0);
    //dbClients.writeInventory();
  });

  it('should dont remove a client in the inventory if the client dont exists', () => {
    let client = new Client(1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    console.log("Estado del inventario de clientes antes de quitar el cliente inexistente:");
    console.log(dbClients._inventory);
    expect(() => (dbClients.removeClient(client))).toThrow(NotInInventoryError);
  });
});