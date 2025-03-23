import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { MerchantSchema } from "../../src/types/merchantschema.js";
import { describe, it, expect } from "vitest";
import { DB_Merchant } from "../../src/db/db_merchants.js";
import { Merchant } from "../../src/models/merchant.js";
import { MerchantType } from "../../src/enums/merchantType.js";
import { Locations } from "../../src/enums/locations.js";
import { NotInInventoryError } from "../../src/errors/notininventoryerror.js";
import { LocationError } from "../../src/errors/locationerror.js";
import { MerchantError } from "../../src/errors/merchanterror.js";
import { TakenIdError } from "../../src/errors/takeniderror.js";
import { IdError } from "../../src/errors/iderror.js";

describe("class DB_Merchant tests", () => {

  const adapter = new JSONFile<MerchantSchema>('./src/db/db_merchants.json');
  const db = new Low<MerchantSchema>(adapter, {merchant: []});
  const dbMerchants = new DB_Merchant(adapter, db);
  it('should be defined', () => {
    expect(dbMerchants).toBeDefined();
  });
  
  it('should have a property adapter', () => {
    expect(dbMerchants.adapter).toBeDefined();
  });
  
  it('should have a property db', () => {
    expect(dbMerchants.db).toBeDefined();
  });
  
  it('should have a property inventory', () => {
    expect(dbMerchants._inventory).toBeDefined();
  });
  
  it('should have a method to initialize the database', async () => {
    await dbMerchants.initDB();
    expect(dbMerchants).toBeDefined();
  });
  
  it('should have a method to read the inventory', async () => {
    await dbMerchants.readIventory();
    expect(dbMerchants).toBeDefined();
  });
  
  it('should have a method to write the inventory', async () => {
    await dbMerchants.writeInventory();
    expect(dbMerchants).toBeDefined();
  });
  
  it('should have a method to add a merchant', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    dbMerchants.addMerchant(merchant);
    //console.log("Estado del inventario tras añadir un comerciante:");
    //console.log(dbMerchants._inventory);
    expect(dbMerchants._inventory.length).toBe(1);
    dbMerchants.writeInventory();
  });
  
  it('should dont add a new merchant in the inventory if the merchant already exists', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    //console.log("Estado del inventario tras añadir un comerciante ya existente:");
    //console.log(dbMerchants._inventory);
    expect(() => (dbMerchants.addMerchant(merchant))).toThrow(TakenIdError);
  });
  
  it('should have a method to remove a merchant', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);

    dbMerchants.readIventory();

    dbMerchants.removeMerchant(merchant);
    dbMerchants.writeInventory();

    expect(dbMerchants._inventory.length).toBe(0);

  });
  
  it('should dont remove a merchant in the inventory if the merchant does not exist', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);

    expect(() => (dbMerchants.removeMerchant(merchant))).toThrow(NotInInventoryError);
  });

  it('should have a method to modify a merchant', () => {

    dbMerchants.readIventory();
    

    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    dbMerchants.addMerchant(merchant);
    dbMerchants.writeInventory();
    

    dbMerchants.readIventory();
    let merchantToModify = dbMerchants._inventory.find(m => m.id === 2);
    
    if (!merchantToModify) {
      throw new Error("El comerciante no se encontró en el inventario.");
    }
    
    dbMerchants.modifyMerchant(merchantToModify, 'location', Locations.NILFGAARD);
    dbMerchants.modifyMerchant(merchantToModify, 'name', 'Alberto el chupacabras');

    
    dbMerchants.writeInventory();
    expect(dbMerchants._inventory.length).toBe(1);
    expect(dbMerchants._inventory[0].location).toBe(Locations.NILFGAARD);
    expect(dbMerchants._inventory[0].name).toBe('Alberto el chupacabras');
  });
  it ('should emit error trying to modify a something that doesnt existe (location or type)', () => {

    dbMerchants.readIventory();
    

    let merchant = new Merchant(3, "Iorveth", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    dbMerchants.addMerchant(merchant);
    dbMerchants.writeInventory();
    

    dbMerchants.readIventory();
    let merchantToModify = dbMerchants._inventory.find(m => m.id === 3);
    
    if (!merchantToModify) {
      throw new Error("El comerciante no se encontró en el inventario.");
    }
    
    const invalidLocation = "MORDOR" as unknown as Locations;
    const invalidType = "MURDERER" as unknown as MerchantType; 
    
    expect(() => {
      dbMerchants.modifyMerchant(merchantToModify, 'location', invalidLocation);
    }).toThrowError(LocationError);
    expect(() => {
      dbMerchants.modifyMerchant(merchantToModify, 'type', invalidType);
      
    }).toThrowError(MerchantError);
  });
  it ('Add 10 merchants to the inventory', () => {
    let merchant1 = new Merchant(1, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    let merchant2 = new Merchant(2, "Roon", MerchantType.BLACKSMIT, Locations.VELEN);
    let merchant3 = new Merchant(3, "Hattori", MerchantType.ENCHANTER, Locations.KAER_MORHEN);
    let merchant4 = new Merchant(4, "Keira Metz", MerchantType.GENERAL_MERCHANT, Locations.TOUSSANT);
    let merchant5 = new Merchant(5, "Olivier", MerchantType.GOBERNOR, Locations.SKELLIGE);
    let merchant6 = new Merchant(6, "Hattori", MerchantType.ALCHEMIST, Locations.VELEN);
    let merchant7 = new Merchant(7, "Keira Metz", MerchantType.BLACKSMIT, Locations.KAER_MORHEN);
    let merchant8 = new Merchant(8, "Olivier", MerchantType.ENCHANTER, Locations.TOUSSANT);
    let merchant9 = new Merchant(9, "Gremist", MerchantType.GENERAL_MERCHANT, Locations.SKELLIGE);
    let merchant10 = new Merchant(10, "Roon", MerchantType.GOBERNOR, Locations.VELEN);
  
    dbMerchants.addMerchant(merchant1);
    expect(() => (dbMerchants.addMerchant(merchant2))).toThrow(TakenIdError);
    expect(() => (dbMerchants.addMerchant(merchant3))).toThrow(TakenIdError);
    dbMerchants.addMerchant(merchant4);
    dbMerchants.addMerchant(merchant5);
    dbMerchants.addMerchant(merchant6);
    dbMerchants.addMerchant(merchant7);
    dbMerchants.addMerchant(merchant8);
    dbMerchants.addMerchant(merchant9);
    dbMerchants.addMerchant(merchant10);
  
    dbMerchants.writeInventory();
  
  });
  it ('should emit error trying to add a merchant that already exists', () => {
    let merchant = new Merchant(1, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    expect(() => (dbMerchants.addMerchant(merchant))).toThrow(TakenIdError);
  });

  it ('should find a merchant by name', () => {
    let merchant = dbMerchants.searchMerchant('name', 'Gremist');
 
    expect(merchant.length).toBe(2);
  });
  it ('should find a merchant by type', () => {
    let merchant = dbMerchants.searchMerchant('type', MerchantType.ALCHEMIST);
   
    expect(merchant.length).toBe(4);
  });
  it ('should find a merchant by location', () => {
    let merchant = dbMerchants.searchMerchant('location', Locations.SKELLIGE);
    expect(merchant.length).toBe(4);
  });
  it ('should find a merchant by id', () => {
    let merchant = dbMerchants.searchMerchant('id', 1);
    expect(merchant.length).toBe(1);
  });
  it ('should emit error trying to search a merchant with an invalid key', () => {
    expect(() => (dbMerchants.searchMerchant('location', Locations.NO))).toThrow(LocationError);
  });
  it ('should emit error trying to search a merchant with an invalid value', () => {
    expect(() => (dbMerchants.searchMerchant('id', 11))).toThrow(MerchantError);
  });
  it ('should emit error trying to search a merchant with an invalid id', () => {
    expect(() => dbMerchants.searchMerchant('id', -1)).toThrow(IdError);
  });
  it ('should emit error trying to search a merchant with an invalid type', () => {
    expect(() => dbMerchants.searchMerchant('type', MerchantType.M)).toThrow(MerchantError);
  });
  it ('should emit error when no merchant is found', () => {
    expect(() => dbMerchants.searchMerchant('name', 'Alberto')).toThrow(MerchantError);
  });
  
});