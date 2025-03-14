import { DB_ROM } from "../db/db_class.js";

// clase generica para comprobar si un objeto esta dentro de la base de datos

export class InventoryContain<T> {
  private inventory: DB_ROM;

  constructor(inventory_: DB_ROM) {
    this.inventory = inventory_;
  }

  checkContain(obj: T): boolean {
    return this.inventory.db.data.goods.some((g) => g === obj);
  }
}