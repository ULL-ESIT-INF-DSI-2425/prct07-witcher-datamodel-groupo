import { InventoryContain } from "./inventory_contain.js";
import { DB_Inventory } from "../db/db_inventory.js";
import { Good } from "../models/good.js";

export class InventoryStock {
  private inventory: DB_Inventory;
  private stock: Map<Good, number>;

  constructor() {
    this.inventory = new DB_Inventory();
    this.stock = new Map();
  }
  async initDB() {
    await this.inventory.initDB();
  }
  getDB() {
    return this.inventory;
  }
  
  /**
   * Add a new good to the inventory
   * @param good - The good we want to add in the invetory
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