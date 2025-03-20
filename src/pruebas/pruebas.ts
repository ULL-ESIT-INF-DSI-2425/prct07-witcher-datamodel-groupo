import { DBManager } from "../services/dbmanager.js";
import { DB_Good } from "../db/db_good.js";
import { Good } from "../models/good.js";
import { Materials } from "../enums/materials.js";
import { DB_Client } from "../db/db_clients.js";
import { Client } from "../models/client.js";
import { DB_Inventory } from "../db/db_inventory.js";

// prueba de la base de datos 

// crear objeto dbmanager

const dbManager = new DBManager();
