// import { DB_Inventory } from "../db/db_inventory.js";
// import { Good } from "../models/good.js";
// import { Merchant } from "../models/merchant.js";
// import { Client } from "../models/client.js";
// import { JSONFile } from "lowdb/node";
// import { Low } from "lowdb";
// import { InventorySchema } from "../types/inventoryschema.js";

// /**
//  * Represents a Inventory Stock object
//  * 
//  * Class InventoryStock
//  * @param inventory - inventory object to check if the object is inside
//  * @param stock - stock of the inventory
//  */
// export class InventoryStock {
//   private inventory: DB_Inventory;
//   private stock: Map<Good, number>;

//   /**
//    * The constructor of the InventoryStock class
//    */
//   constructor(inventory_: DB_Inventory) {
//     // inicializar el inventario con la base de datos
//     const adapter = new JSONFile<InventorySchema>("./src/db/db_inventory.json");
//     const db = new Low<InventorySchema>(adapter, { goods: [], merchant: [], client: [] });
//     inventory_.db = db;
//     inventory_.adapter = adapter;
//     this.inventory = inventory_;
//     this.stock = new Map();
//   }
//   /**
//    * Initialize the inventory database
//    * @returns A promise with the initialization of the database
//    */
//   async initDB(): Promise<void> {
//     await this.inventory.initDB();
//   }

//   /**
//    * Get the database
//    * @returns The database object
//    */
//   getDB(): DB_Inventory {
//     return this.inventory;
//   }
//   getStock(): Map<Good, number> {
//     return this.stock;
//   }
  
//   /**
//    * Add a new good to the inventory
//    * @param good - The good we want to add in the invetory
//    * @returns A promise with the addition of the good
//    * @example
//    * ```typescript
//    * const good = new Good(1, "Espada", "Una espada de acero", Materials.Steel, 2, 10);
//    * const inventoryStock = new InventoryStock();
//    * await inventoryStock.initDB();
//    * await inventoryStock.addGood(good);
//    * ```
//    */
//   async addGood(good: Good): Promise<void> {
    
//     if (!this.inventory.db.data.goods.some((g) => g.id === good.id)) {
//       this.inventory.db.data.goods.push(good);
//       await this.inventory.db.write();
//       this.stock.set(good, 1);
//     } else {
//       // No introduce el good en la base de datos, solo incrementa el stock
//       this.stock.set(good, (this.stock.get(good) ?? 0) + 1);
//     }
//     await this.inventory.db.write();
//   }

//   /**
//    * Remove a good from the inventory
//    * @param good - The good we want to remove from the inventory
//    * @returns A promise with the removal of the good
//    * @example
//    * ```typescript
//    * const good = new Good(1, "Espada", "Una espada de acero", Materials.Steel, 2, 10);
//    * const inventoryStock = new InventoryStock();
//    * await inventoryStock.initDB();
//    * await inventoryStock.addGood(good);
//    * await inventoryStock.removeGood(good);
//    * ```
//    */
//   async removeGood(good: Good): Promise<void> {
//     if (this.inventory.db.data.goods.some((g) => g.id === good.id) && this.stock.get(good)! > 0) {
//       this.stock.set(good, this.stock.get(good)! - 1);
//     } else if (!this.inventory.db.data.goods.some((g) => g.id === good.id)) {
//       throw new Error("The good is not in the inventory"); // TODO: Create a custom error
//     } else {
//       throw new Error("The good is out of stock"); // TODO: Create a custom error
//     }
//     await this.inventory.db.write();
//   }


//   async addMerchant(merchant: Merchant): Promise<void> {
//     // if (!this.inventory.db.data?.merchant.some((m) => m === merchant)) {
//     //   this.inventory.db.data?.merchant.push(merchant);
//     //   await this.inventory.db.write();
//     // } else {
//     //   throw new Error("The merchant is already in the inventory");
//     // }
//     if (!this.inventory.db.data?.merchant.some((m) => m.id === merchant.id)) {
//       this.inventory.db.data?.merchant.push(merchant);
//       await this.inventory.db.write();
//     } else {
//       throw new Error("The merchant is already in the inventory");
//     }
//   }


//   async removeMerchant(merchant: Merchant): Promise<void> {
//     if (this.inventory.db.data.merchant.some((m) => m.id === merchant.id)) {
//       this.inventory.db.data.merchant = this.inventory.db.data.merchant.filter((m) => m.id !== merchant.id); // TODO: Check if this works
//       await this.inventory.db.write();
//     } else {
//       throw new Error("The merchant is not in the inventory");
//     }
//     await this.inventory.db.write();
//   }

  
//   async addClient(client: Client): Promise<void> {
//     if (!this.inventory.db.data?.client.some((c) => c.id === client.id)) {
//       this.inventory.db.data?.client.push(client);
//       await this.inventory.db.write();
//     } else {
//       throw new Error("The client is already in the inventory");
//     }
//     await this.inventory.db.write();
//   }

//   async removeClient(client: Client): Promise<void> {
//     if (this.inventory.db.data.client.some((c) => c.id === client.id)) {
//       this.inventory.db.data.client = this.inventory.db.data.client.filter((c) => c.id !== client.id); // TODO: Check if this works
//       await this.inventory.db.write();
//     } else {
//       throw new Error("The client is not in the inventory");
//     }
//     await this.inventory.db.write();
//   }

// /**
//  * Check the stock of all goods in the inventory
//  * @returns A promise with an array of goods and their stock
//  */
//   // async checkGoodStock(): Promise<{ id: number; name: string; quantity: number; value: number }[]> {
//   //   await this.inventory.db.read(); // Asegurar que tenemos los datos más recientes de la base de datos

//   //   if (!this.inventory.db.data?.goods || this.inventory.db.data.goods.length === 0) {
//   //     return []; // Si no hay bienes en la base de datos, retornamos una lista vacía
//   //   }

//   //   // Crear un array con la información del stock de cada bien
//   //   return this.inventory.db.data.goods.map((good) => ({
//   //     id: good.id,
//   //     name: good.name,
//   //     quantity: this.stock.get(good) ?? 0, // Obtener la cantidad en stock, si no existe, asumimos 0
//   //     value: good.value, // Precio del bien
//   //   }));
//   // }

// }

// // DELETE