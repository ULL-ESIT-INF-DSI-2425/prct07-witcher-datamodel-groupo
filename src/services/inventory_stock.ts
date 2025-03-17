import { InventoryContain } from "./inventory_contain.js";
import { DB_Inventory } from "../db/db_inventory.js";
import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { InventorySchema } from "../types/inventoryschema.js";

/**
 * Represents a Inventory Stock object
 * 
 * Class InventoryStock
 * @param inventory - inventory object to check if the object is inside
 * @param stock - stock of the inventory
 */
export class InventoryStock {
  private inventory: DB_Inventory;
  private stock: Map<Good, number>;

  /**
   * The constructor of the InventoryStock class
   */
  constructor() {
    // inicializar el inventario con la base de datos
    const adapter = new JSONFile<InventorySchema>("./src/db/db_inventory.json");
    const db = new Low<InventorySchema>(adapter, { goods: [], merchant: [], client: [] });

    this.inventory = new DB_Inventory(adapter, db);
    this.stock = new Map();
  }
  /**
   * Initialize the inventory database
   * @returns A promise with the initialization of the database
   */
  async initDB(): Promise<void> {
    await this.inventory.initDB();
  }

  /**
   * Get the database
   * @returns The database object
   */
  getDB(): DB_Inventory {
    return this.inventory;
  }
  getStock(): Map<Good, number> {
    return this.stock;
  }
  
  /**
   * Add a new good to the inventory
   * @param good - The good we want to add in the invetory
   * @returns A promise with the addition of the good
   * @example
   * ```typescript
   * const good = new Good(1, "Espada", "Una espada de acero", Materials.Steel, 2, 10);
   * const inventoryStock = new InventoryStock();
   * await inventoryStock.initDB();
   * await inventoryStock.addGood(good);
   * ```
   */
  async addGood(good: Good): Promise<void> {
    // const inventoryContain = new InventoryContain(this.inventory);
    // if (!inventoryContain.checkContain(good)) {
    //   this.inventory.db.data?.goods.push(good);
    //   await this.inventory.db.write();
    //   this.stock.set(good, 1);
    // } else { // in case the good is already in the inventory
    //   this.stock.set(good, this.stock.get(good)! + 1);
    // }
    
    // usar inventoryContain para comprobar si el item ya existe en la base de datos
    const inventoryContain = new InventoryContain(this.inventory);
    if (!inventoryContain.checkContain(good)) {
      this.inventory.db.data?.goods.push(good);
      await this.inventory.db.write();
      this.stock.set(good, 1);
    } else { // in case the good is already in the inventory
      this.stock.set(good, this.stock.get(good)! + 1);
    }
  }
  async removeGood(good: Good): Promise<void> {
    // const inventoryContain = new InventoryContain(this.inventory);
    // if (inventoryContain.checkContain(good) && this.stock.get(good)! > 0) {
    //   this.stock.set(good, this.stock.get(good)! - 1);
    // } else if (!inventoryContain.checkContain(good)) {
    //   throw new Error("The good is not in the inventory"); // TODO: Create a custom error
    // } else if (inventoryContain.checkContain(good) && this.stock.get(good)! === 0) {
    //   throw new Error("The good is out of stock"); // TODO: Create a custom error
    // }
    const inventoryContain = new InventoryContain(this.inventory);
    if (inventoryContain.checkContain(good) && this.stock.get(good)! > 0) {
      this.stock.set(good, this.stock.get(good)! - 1);
    } else if (!inventoryContain.checkContain(good)) {
      throw new Error("The good is not in the inventory"); // TODO: Create a custom error
    } else {
      throw new Error("The good is out of stock"); // TODO: Create a custom error
    }
  }
  async addMerchant(merchant: Merchant): Promise<void> {
    // if (!this.inventory.db.data?.merchant.some((m) => m === merchant)) {
    //   this.inventory.db.data?.merchant.push(merchant);
    //   await this.inventory.db.write();
    // } else {
    //   throw new Error("The merchant is already in the inventory");
    // }
    const inventoryContain = new InventoryContain(this.inventory);
    if (!inventoryContain.checkContain(merchant)) {
      this.inventory.db.data?.merchant.push(merchant);
      await this.inventory.db.write();
    } else {
      throw new Error("The merchant is already in the inventory");
    }
  }
  async removeMerchant(merchant: Merchant): Promise<void> {
    const inventoryContain = new InventoryContain(this.inventory);
    if (inventoryContain.checkContain(merchant)) {
      this.inventory.db.data.merchant = this.inventory.db.data.merchant.filter((m) => m !== merchant); // TODO: Check if this works
      await this.inventory.db.write();
    } else {
      throw new Error("The merchant is not in the inventory");
    }
  }
  async addClient(client: Client): Promise<void> {
    const inventoryContain = new InventoryContain(this.inventory);
    if (!inventoryContain.checkContain(client)) {
      this.inventory.db.data?.client.push(client);
      await this.inventory.db.write();
    } else {
      throw new Error("The client is already in the inventory");
    }
  }
  async removeClient(client: Client): Promise<void> {
    const inventoryContain = new InventoryContain(this.inventory);
    if (inventoryContain.checkContain(client)) {
      this.inventory.db.data.client = this.inventory.db.data.client.filter((c) => c !== client); // TODO: Check if this works
      await this.inventory.db.write();
    } else {
      throw new Error("The client is not in the inventory");
    }
  }
}