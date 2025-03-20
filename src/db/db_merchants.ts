import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { MerchantSchema } from "../types/merchantschema.js";
import { Merchant } from "../models/merchant.js";
import { MerchantAlreadyExistsError } from "../errors/merchantalreadyexists.js";
import { NotInInventoryError } from "../errors/notininventoryerror.js";

/**
 * Class that represents the database of merchants
 * 
 * DB_Merchant class
 */
export class DB_Merchant {

  accessor _adapter: JSONFile<MerchantSchema>;
  accessor _db: Low<MerchantSchema>;
  accessor _inventory: Merchant[] = [];

  /**
   * Constructor of the DB_Merchant class
   * 
   * @param adapter - The JSON File adapter
   * @param db - The LowDB instance
   * @param filepath - The path to the JSON File
   * @param initialData - The initial data for the database
   */
  constructor(
    public adapter: JSONFile<MerchantSchema>,
    public db: Low<MerchantSchema>,
    public filepath: string = "./src/db/db_merchants.json",
    public initialData: MerchantSchema = { merchant: [] }
  ){
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<MerchantSchema>(filepath);
    this.db = new Low<MerchantSchema>(adapter, initialData);
  }

  /**
   * Method that initializes the database
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * ```
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }

  /**
   * Method that reads the inventory from the database
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readIventory();
   * ```
   */
  async readIventory(): Promise<void> {
    await this.db.read();
    this._inventory = this.db.data.merchant;
  }

  /**
   * Method that writes the inventory to the database
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.writeInventory();
   * ```
   */
  async writeInventory(): Promise<void> {
    this.db.data.merchant = this._inventory;
    await this.db.write();
  }

  /**
   * Method that returns the inventory
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readIventory();
   * console.log(db.inventory);
   * ```
   */
  addMerchant(merchantToAdd: Merchant): void {
    let merchant_array: Merchant[] = [];

    this._inventory.forEach((merchant) => {
      merchant_array.push(merchant);
    });

    if(merchant_array.includes(merchantToAdd)){
      throw new MerchantAlreadyExistsError('Merchant already exists');  
    } else {
      this._inventory.push(merchantToAdd);
    }
  }

  /**
   * Method that removes a merchant from the inventory
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readIventory();
   * db.removeMerchant(merchantToRemove);
   * ```
   */
  removeMerchant(merchantToRemove: Merchant): void {
    let merchant_array: Merchant[] = [];

    this._inventory.forEach((merchant) => {
      merchant_array.push(merchant);
    });

    if(!merchant_array.includes(merchantToRemove)){
      throw new NotInInventoryError('The merchant is not in the inventory');
    } else {
      this._inventory = this._inventory.filter((merchant) => merchant.id !== merchantToRemove.id);

    }
  }
}