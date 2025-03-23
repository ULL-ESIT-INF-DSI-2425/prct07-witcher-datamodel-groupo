import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { MerchantSchema } from "../types/merchantschema.js";
import { Merchant } from "../models/merchant.js";
import { MerchantAlreadyExistsError } from "../errors/merchantalreadyexists.js";
import { NotInInventoryError } from "../errors/notininventoryerror.js";
import { NotModifyId } from "../errors/notmodifyid.js";
import { Locations } from "../enums/locations.js";
import { MerchantType } from "../enums/merchantType.js";
import { LocationError } from "../errors/locationerror.js";
import { MerchantError } from "../errors/merchanterror.js";
import { TakenIdError } from "../errors/takeniderror.js";
import { IdError } from "../errors/iderror.js";
import { InvalidKey } from "../errors/invalidkey.js";

/**
 * Class that represents the database of merchants
 * 
 * DB_Merchant class
 * @param _adapater - The JSON File adapter
 * @param _db - The LowDB instance
 * @param _inventory - The inventory of merchants
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
    this.readIventory();

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
   * @param merchantToAdd - The merchant to add
   * @throws MerchantAlreadyExistsError - If the merchant already exists
   * @throws TakenIdError - If the id is already taken
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

    if(merchant_array.includes(merchantToAdd) || this._inventory.some((merchant) => merchant.id === merchantToAdd.id)){
      if (merchant_array.includes(merchantToAdd)) {
        throw new MerchantAlreadyExistsError('Merchant already exists');
      } else {
        throw new TakenIdError('The id is already taken');
      }
    } else {
      this._inventory.push(merchantToAdd);

    }
  }

  /**
   * Method that removes a merchant from the inventory
   * @param merchantToRemove - The merchant to remove
   * @throws NotInInventoryError - If the merchant is not in the inventory
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

    let flag = false;
    this._inventory.forEach((merchant) => {
      if(merchant.id === merchantToRemove.id && merchant.name === merchantToRemove.name && merchant.type === merchantToRemove.type && merchant.location === merchantToRemove.location){
        flag = true;
      }
    });
    if(flag === false){
      throw new NotInInventoryError('The merchant is not in the inventory');
    } else {
      this._inventory = this._inventory.filter((merchant) => merchant.id !== merchantToRemove.id);

    }
  }

  /** 
   * Method that modifies a merchant in the inventory
   * @param merchantToModify - The merchant to modify
   * @param key - The key of the property to modify
   * @param value - The value to set
   * @throws NotInInventoryError - If the merchant is not in the inventory
   * @throws NotModifyId - If the id
   * @throws LocationError - If the location is invalid
   * @throws MerchantError - If the merchant type is invalid
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readIventory();
   * db.modifyMerchant(merchantToModify, key, value);
   * ```
   */
  modifyMerchant<T extends keyof Merchant>(merchantToModify: Merchant, key: T, value: Merchant[T]): void {
    if (!this._inventory.some((merchant) => merchant.id === merchantToModify.id)) {
      throw new NotInInventoryError('The merchant is not in the inventory');
    }
  
    if (key === 'id') {
      throw new NotModifyId('The id cannot be modified');
    }


    switch (key) {
      case 'location':
        if (!Object.values(Locations).includes(value as Locations)) {
          throw new LocationError(`Invalid location: ${value}`);
        }
        break;
      case 'type':
        if (!Object.values(MerchantType).includes(value as MerchantType)) {
          throw new MerchantError(`Invalid merchant type: ${value}`);
        }
        break;
    }

    this._inventory = this._inventory.map((merchant) => 
      merchant.id === merchantToModify.id
        ? ({ ...merchant, [key]: value } as Merchant)
        : merchant
    );
  }

  /**
   * Method that searches for a merchant in the inventory
   * @param key - The key of the property to search for
   * @param value - The value to search for
   * @throws MerchantError - If the merchant type is invalid
   * @throws LocationError - If the location is invalid
   * @throws InvalidKey - If the key is invalid
   * @example
   * ```typescript
   * const db = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(adapter, initialData));
   * await db.initDB();
   * await db.readIventory();
   * db.searchMerchant(key, value);
   * ```
   */
  searchMerchant<T extends keyof Merchant>(key: T, value: Merchant[T]): Merchant[] {
    switch (key) {
      case 'id':
        IdError.validate(value as number);
        break;

      case 'name': 
        if (typeof value !== 'string' || value.trim() === '') {
          throw new Error('The name must be a non-empty string');
        }
        break;
      case 'type':
        if (!Object.values(MerchantType).includes(value as MerchantType)) {
          throw new MerchantError(`Invalid merchant type: ${value}`);
        }
        break;
      case 'location':
        if (!Object.values(Locations).includes(value as Locations)) {
          throw new LocationError(`Invalid location: ${value}`);
        }
        break;
      default:
        throw new InvalidKey(`Invalid key: ${key}`);
    }
    let result = this._inventory.filter((merchant) => merchant[key] === value);
    if (result.length === 0) {
      throw new MerchantError(`No merchant found with ${key} ${value}`);
    }
    return this._inventory.filter((merchant) => merchant[key] === value);
  } 
}