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
    // buscar si el comerciante está en el inventario
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
  // funcion que modifica un mercader. Será una función genérica 
  modifyMerchant<T extends keyof Merchant>(merchantToModify: Merchant, key: T, value: Merchant[T]): void {
    if (!this._inventory.some((merchant) => merchant.id === merchantToModify.id)) {
      throw new NotInInventoryError('The merchant is not in the inventory');
    }
  
    if (key === 'id') {
      throw new NotModifyId('The id cannot be modified');
    }

    // Validaciones según la propiedad a modificar
    switch (key) {
      case 'location':
        // comprobar si la ubicación es válida (mirar si está dentro del enum)
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

    return this._inventory.filter((merchant) => merchant[key] === value);
  }

  
}