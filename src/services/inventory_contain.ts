import { DB_Inventory } from "../db/db_inventory.js";

// clase generica para comprobar si un objeto esta dentro de la base de datos

export class InventoryContain<T> {
  private inventory: DB_Inventory;

  constructor(inventory_: DB_Inventory) {
    this.inventory = inventory_;
  }

  checkContain(obj: T): boolean {
    return this.inventory.db.data.goods.some((g) => g === obj);
  }
}