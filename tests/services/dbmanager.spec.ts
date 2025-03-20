import { describe, it, expect } from "vitest";
import { DBManager } from "../../src/services/dbmanager.js";
import { DB_Good } from "../../src/db/db_good.js";
import { DB_Client } from "../../src/db/db_clients.js";
import { DB_Merchant } from "../../src/db/db_merchants.js";

describe("class DBManager tests", () => {
  
  it("should create a new dbmanager instance", () => {
    const dbManager = new DBManager();
    expect(dbManager).toBeDefined();
  });

  it("should instanciate each attribute ", () => {
    const dbManager = new DBManager();
    expect(dbManager.getDBGood()).toBeInstanceOf(DB_Good);
    expect(dbManager.getDBClient()).toBeInstanceOf(DB_Client);
    expect(dbManager.getDBMerchant()).toBeInstanceOf(DB_Merchant);
  });

});

