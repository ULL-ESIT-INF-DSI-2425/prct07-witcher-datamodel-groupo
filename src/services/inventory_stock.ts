import { InventoryContain } from "./inventory_contain.js";
import { DB_Inventory } from "../db/db_inventory.js";
import { Good } from "../models/good.js";

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
    this.inventory = new DB_Inventory();
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
    const inventoryContain = new InventoryContain(this.inventory);
    if (!inventoryContain.checkContain(good)) {
      this.inventory.db.data?.goods.push(good);
      await this.inventory.db.write();
      this.stock.set(good, 1);
    } else { // in case the good is already in the inventory
      this.stock.set(good, this.stock.get(good)! + 1);
    }
  }
}