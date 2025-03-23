import { DBGood } from "../interfaces/db_good.js";
import { GoodSchema } from "../types/goodschema.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { GoodStack } from "../types/goodstack.js";
import { Good } from "../models/good.js";
import { TakenIdError } from "../errors/takeniderror.js";
import { NotInInventoryError } from "../errors/notininventoryerror.js";
import { NoAtributeError } from "../errors/noatributeerror.js";

/**
 * This class is used to represent the database for the goods
 * 
 * DBGood class
 * @param _adapter - The JSON file adapter
 * @param _db - The LowDB instance
 * @param _inventory - The inventory of goods
 * @param _goodsIds - The ids of the goods
 */
export class DB_Good implements DBGood {
  accessor _adapter: JSONFile<GoodSchema>;
  accessor _db: Low<GoodSchema>;
  accessor _inventory: GoodStack[] = [];
  accessor _goodsIds: number[] = [];

  /**
   * The constructor for the DB_Good class
   * @param adapter - The JSON file adapter
   * @param db - The LowDB instance
   * @param filePath - The path to the JSON file
   * @param initialData - The initial data for the database
   */
  constructor(
    public adapter: JSONFile<GoodSchema>,
    public db: Low<GoodSchema>,
    public filePath: string = "./src/db/db_good.json",
    public initialData: GoodSchema = { goods: [] },
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<GoodSchema>(filePath);
    this.db= new Low<GoodSchema>(this.adapter, initialData);
    this.readInventory();
    this.loadGoodId();
  }

  /**
   * The method to initialize the database
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }

  /**
   * The method to read the inventory and save it in the _inventory property
   */
  async readInventory(): Promise<void> {
    await this.db.read();
    this._inventory = this.db.data.goods;
  }

  /**
   * The method to write the inventory to the database
   */
  async writeInventory(): Promise<void> {
    this.db.data.goods = [...this._inventory];
    await this.db.write();
  }


  /**
   * Loads the goods from the database.
   * It is called when the application starts.
   * @example
   * ```typescript
   * dbmanager.loadGoods();
   * ```
   */
  loadGoodId(): void {
    this._inventory.forEach((good) => {
      this._goodsIds.push(good[0].id);
    });  
  }

  /**
   * Adds a good to the inventory.
   * If the good is already in the inventory, it adds one to the quantity.
   * If the good is not in the inventory, it adds it to the inventory with a quantity of 1.
   * @param goodToAdd - The good to add to the inventory.
   * @throws TakenIdError - If the id of the good is already taken.
   * @example
   * ```typescript
   * const good = new Good(1, 'Sword', 'A sharp sword', 10, 5, 'Iron');
   * dbmanager.addGood(good);
   * ```
   */
  addGood(goodToAdd: Good): void {
    let goods_array: Good[] = [];
    this._inventory.forEach((good) => {
      goods_array.push(good[0]);
    });
    
    if (goods_array.some((good) => good.id === goodToAdd.id && good.name !== goodToAdd.name)) {
      throw new TakenIdError('That ID is already taken!');
    } else if (goods_array.some((good) => good.id === goodToAdd.id)) {
      this._inventory.forEach((good) => {
        if (good[0].id === goodToAdd.id) {
          good[1]++;
        }
      });
    } else {
      const addedGood: GoodStack = [goodToAdd, 1];
      this._inventory.push(addedGood);
    }
  }

  /**
   * Removes a good from the inventory.
   * If the good is in the inventory, it removes one from the quantity.
   * If the quantity is 0, it removes the good from the inventory.
   * @param goodToRemove - The good to remove from the inventory.
   * @throws NotInInventoryError - If the good is not in the inventory.
   * @example
   * ```typescript
   * const good = new Good(1, 'Sword', 'A sharp sword', 10, 5, 'Iron');
   * dbmanager.removeGood(good);
   * ```
   */
  removeGood(goodToRemove: Good): void {
    let goods_array: Good[] = [];
    this._inventory.forEach((good) => {
      goods_array.push(good[0]);
    });
    
    if (goods_array.some((good) => good.id === goodToRemove.id)) {
      this._inventory.forEach((good) => {
        if (good[0].id === goodToRemove.id) {
          good[1]--;
          if (good[1] === 0) {
            this._inventory = this._inventory.filter(item => item[0].id !== goodToRemove.id);
          }
        }
      });
    } else {
      throw new NotInInventoryError('The good is not in the inventory');
    }
  }
  
  /**
   * Searches for goods in the inventory by name.
   * @param name - The name of the good to search for.
   * @returns An array of matching goods.
   * @example
   * ```typescript
   * const result = dbmanager.searchGoodsByName('Sword');
   * console.table(result);
   * ```
   */
  searchGoodsByName(name: string): GoodStack[] {
    let result = this._inventory
      .map((goodStack) => goodStack)
      .filter((good) => good[0].name.toLowerCase().includes(name.toLowerCase()));

    return result;
  }

  /**
   * Searches for goods in the inventory by description.
   * @param description - The description of the good to search for.
   * @returns An array of matching goods.
   * @example
   * ```typescript
   * const result = dbmanager.searchGoodsByDescription('sharp');
   * console.table(result);
   * ```
   */
  searchGoodsByDescription(description: string): GoodStack[] {
    let result = this._inventory
    .map((goodStack) => goodStack)
    .filter((good) => good[0].description.toLowerCase().includes(description.toLowerCase()));
    return result;
  }

  /**
   * Sorts goods in the inventory alphabetically by name.
   * @param order - The sorting order ('asc' for ascending, 'desc' for descending).
   * @returns An array of sorted goods.
   * @example
   * ```typescript
   * const result = dbmanager.sortGoodsAlphabetically('asc');
   * console.table(result);
   * ```
   */
  sortGoodsAlphabetically(order: 'asc' | 'desc'): Good[] {
    let sortedAlfResult = this._inventory
      .map((goodStack) => goodStack[0]) 
      .sort((a, b) => {
        if (order === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    return sortedAlfResult;
  }

  /**
   * Sorts goods in the inventory by their value in crowns.
   * @param order - The sorting order ('asc' for ascending, 'desc' for descending).
   * @returns An array of sorted goods.
   * @example
   * ```typescript
   * const result = dbmanager.sortGoodsByValue('asc');
   * console.table(result);
   * ```
   */
  sortGoodsByValue(order: 'asc' | 'desc'): Good[] {
    let sortedValResult = this._inventory
      .map((goodStack) => goodStack[0]) 
      .sort((a, b) => {
        if (order === 'asc') {
          return a.value - b.value; 
        } else {
          return b.value - a.value; 
        }
      });
    return sortedValResult;
  }

  /**
   * Modifies a specific attribute of a good in the inventory.
   * @param goodId - The ID of the good to modify.
   * @param attribute - The attribute to modify (e.g., 'name', 'description', 'value', 'weight', 'material').
   * @param newValue - The new value to set for the specified attribute.
   * @throws NotInInventoryError - If the good is not found in the inventory.
   * @throws Error - If the attribute does not exist on the Good object.
   * @example
   * ```typescript
   * dbmanager.modifyGoodAttribute(1, 'name', 'Sharp Sword');
   * ```
   */
  modifyGoodAttribute<K extends keyof Good>(goodId: number, attribute: K, newValue: Good[K]): void {
    const goodStack = this._inventory.find((goodStack) => goodStack[0].id === goodId);

    if (!goodStack) {
      throw new NotInInventoryError('The good is not in the inventory');
    }

    const good = goodStack[0];
    if (attribute in good) {
      good[attribute] = newValue; 
      this.writeInventory(); 
    } else {
      throw new NoAtributeError(`Attribute "${attribute}" does not exist on Good`);
    }
  }
}