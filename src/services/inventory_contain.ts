import { DB_Inventory } from "../db/db_inventory.js";

// clase generica para comprobar si un objeto esta dentro de la base de datos

/**
 * Represents a Inventory Contain object
 * 
 * Class InventoryContain
 * @param inventory - inventory object to check if the object is inside
 */
export class InventoryContain<T> {
  private inventory: DB_Inventory;

  /**
   * The constructor of the InventoryContain class
   * @param inventory_ - The inventory object to check if the object is inside
   */
  constructor(inventory_: DB_Inventory) {
    this.inventory = inventory_;
  }

  /**
   * A method that checks if the object is inside the inventory
   * @param obj - The object to check if it is inside the inventory
   * @returns A boolean value if the object is inside the inventory
   */
  checkContain(obj: T): boolean {
    return this.inventory.db.data.goods.some((g) => g === obj);
  }
}