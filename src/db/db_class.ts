// import { DB } from "../interfaces/db.js";
// import { Low } from "lowdb";
// import { JSONFile } from "lowdb/node";
// import { DataSchema } from "../types/dataschema.js";

// export class DB_ROM implements DB {
//   constructor(
//     public adapter: JSONFile<DataSchema> = new JSONFile<DataSchema>("./src/db/db.json"),
//     public initialData: DataSchema,
//     public db: Low<DataSchema> = new Low<DataSchema>(adapter, initialData),
//   ) { }
//   async initDB() {
//     await this.db.read();
//     this.db.data ||= this.initialData; // If the file is empty, use the initial data
//     await this.db.write();
//   }
// }

import { DB } from "../interfaces/db.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DataSchema } from "../types/dataschema.js";

export class DB_ROM implements DB {
  public adapter: JSONFile<DataSchema>;
  public db: Low<DataSchema>;

  constructor(
    public filePath: string = "./src/db/db.json", // Ruta del archivo de la BD
    public initialData: DataSchema = { goods: [], merchants: [], customers: [], transactions: [] }
  ) {
    this.adapter = new JSONFile<DataSchema>(filePath); // Crear el adaptador aquí
    this.db = new Low<DataSchema>(this.adapter, initialData);
  }

  async initDB() {
    await this.db.read();
    this.db.data ||= this.initialData; // Si el archivo está vacío, usa los datos iniciales
    await this.db.write();
  }
}
