import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { Client } from "../models/client.js";
import { ClientSchema } from "../types/clientschema.js";
import { NotInInventoryError } from "../errors/notininventoryerror.js";
import { ClientAlreadyExistsError } from "../errors/clientalreadyexits.js";

/**
 * Class that represents the database of clients
 * 
 * DB_Client class
 */
export class DB_Client {

  accessor _adapter: JSONFile<ClientSchema>;
  accessor _db: Low<ClientSchema>;
  accessor _inventory: Client[] = [];

  /**
   * The constructor for the DB_Client class
   * @param adapter - The JSON File adapter
   * @param db - The LowDB instance
   * @param filepath - The path to the JSON File
   * @param initialData - The initial data for the database
   */
  constructor(
    public adapter: JSONFile<ClientSchema>,
    public db: Low<ClientSchema>,
    public filepath: string = "./src/db/db_client.json",
    public initialData: ClientSchema = { clients: [] }
  ) {
    this._adapter = adapter
    this._db = db;
    this.adapter = new JSONFile<ClientSchema>(filepath);
    this.db = new Low<ClientSchema>(this.adapter, initialData);
  }

  /**
   * The method to initialize the database
   * @example
   * ```typescript
   * const db = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(adapter, initialData));
   * await db.initDB();
   * ```
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }

  /**
   * The method to read the inventory and save it in the _inventory attribute
   * @example
   * ```typescript
   * const db = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readInventory();
   * ```
   */
  async readInventory(): Promise<void> {
    await this.db.read();
    this._inventory = this.db.data.clients;
  }

  /**
   * The method to write the inventory to the database
   * @example
   * ```typescript
   * const db = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readInventory();
   * await db.writeInventory();
   * ```
   */
  async writeInventory(): Promise<void> {
    this.db.data.clients = this._inventory;
    await this.db.write();
  }

  /**
   * The method to add a client to the inventory
   * @param clientToAdd - The client to add to the inventory
   * @throws ClientAlreadyExistsError - If the client already exists in the inventory
   * @example
   * ```typescript
   * const db = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(adapter, initialData));
   * await db.initDB();
   * db.addClient(clientToAdd);
   * await db.writeInventory();
   * ```
   */
  addClient(clientToAdd: Client): void {
    let client_array: Client[] = [];

    this._inventory.forEach((client) => {
      client_array.push(client);
    });

    if(client_array.includes(clientToAdd)){
      throw new ClientAlreadyExistsError('Client already exists');
    } else {
      this._inventory.push(clientToAdd);
    }
  }

  /**
   * The method to remove a client from the inventory
   * @param clientToRemove - The client to remove from the inventory
   * @throws NotInInventoryError - If the client is not in the inventory
   * @example
   * ```typescript
   * const db = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(adapter, initialData));
   * await db.initDB();
   * db.removeClient(clientToRemove);
   * await db.writeInventory();
   * ```
   */
  removeClient(clientToRemove: Client): void {
    let client_array: Client[] = [];

    this._inventory.forEach((client) => {
      client_array.push(client);
    });

    if(!client_array.includes(clientToRemove)){
      throw new NotInInventoryError('The client is not in the inventory');
    } else {
      this._inventory = this._inventory.filter((client) => client.id !== clientToRemove.id);
    }
  }
};