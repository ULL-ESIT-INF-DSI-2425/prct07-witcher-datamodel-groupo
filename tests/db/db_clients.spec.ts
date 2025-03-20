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
import { RaceError } from "../../src/errors/raceerror.js";
import { LocationError } from "../../src/errors/locationerror.js";

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

  it('should have a method to modify a client in the inventory', () => {
    
    console.log("Estado del inventario de clientes antes de modificar el cliente:");
    console.log(dbClients._inventory);

    dbClients.readInventory();
    
    let client = new Client(1, "Geralt", Races.WITCHER, Locations.KAER_MORHEN);
    dbClients.addClient(client);
    dbClients.writeInventory();

    console.log("Estado del inventario de clientes al añadir el cliente:");
    console.log(dbClients._inventory);
    
    dbClients.readInventory();
    let clientToModify = dbClients._inventory.find(client => client.id === 1);

    dbClients.modifyClient(clientToModify, "name", "Geraldo");

    console.log("Estado del inventario de clientes al modificar el cliente:");
    console.log(dbClients._inventory);

    dbClients.writeInventory();

    expect(dbClients._inventory[0].name).toBe("Geraldo");
  });

  it('should emit error trying to modify a client in the inventory if the client dont exists', () => {
    
    console.log("Estado del inventario de clientes antes de modificar el cliente inexistente:");
    console.log(dbClients._inventory);

    dbClients.readInventory();

    let client = new Client(2, "Tormunt", Races.ELF, Locations.REDANIA);
    dbClients.addClient(client);
    dbClients.writeInventory();

    console.log("Estado del inventario de clientes al añadir el cliente:");
    console.log(dbClients._inventory);

    dbClients.readInventory();
    let clientToModify = dbClients._inventory.find(client => client.id === 2);

    if(!clientToModify) {
      throw new Error('El cliente no existe en el inventario');
    }

    const invalidRace = "Tiefling" as unknown as Races;
    const invalidLocation = "Neverwinter" as unknown as Locations;

    expect(() => (dbClients.modifyClient(clientToModify, 'race', invalidRace))).toThrow(RaceError);
    expect(() => (dbClients.modifyClient(clientToModify, 'location', invalidLocation))).toThrow(LocationError);
  });

  it('Add 10 clients to the inventory', () => {
    const client1 = new Client(1, "Alice", Races.HUMAN, Locations.TOUSSANT);
    const client2 = new Client(2, "Bob", Races.ELF, Locations.REDANIA);
    const client3 = new Client(3, "Charlie", Races.DWARF, Locations.SKELLIGE);
    const client4 = new Client(4, "Diana", Races.HALVEELF, Locations.REDANIA);
    const client5 = new Client(5, "Eve", Races.HUMAN, Locations.REDANIA);
    const client6 = new Client(6, "Frank", Races.ELF, Locations.NILFGAARD);
    const client7 = new Client(7, "Grace", Races.DWARF, Locations.NOVIGRAD);
    const client8 = new Client(8, "Hank", Races.HALVELING, Locations.SKELLIGE);
    const client9 = new Client(9, "Ivy", Races.HUMAN, Locations.NILFGAARD);
    const client10 = new Client(10, "Jack", Races.ELF, Locations.VELEN);
  
    // Agregar clientes al inventario
    dbClients.addClient(client1);
    dbClients.addClient(client2);
    dbClients.addClient(client3);
    dbClients.addClient(client4);
    dbClients.addClient(client5);
    dbClients.addClient(client6);
    dbClients.addClient(client7);
    dbClients.addClient(client8);
    dbClients.addClient(client9);
    dbClients.addClient(client10);

    dbClients.writeInventory();
  });
});