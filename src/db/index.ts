//import { initDB, db } from "./db.js"; // Asegurate de la ruta correcta
import { Materials } from "../enums/materials.js";
import { DB_ROM } from "./db_class.js";
import { Locations } from "../enums/locations.js";
import { MerchantType } from "../enums/merchantType.js";

async function main() {
  let db_rom = new DB_ROM(); // Base de datos con archivo por defecto
  await db_rom.initDB();
  
  db_rom.db.data.goods.push({
    id: 0,
    name: "Queso",
    description: "Queso curado de Mahakam",
    material: Materials.MAKAHAM_STEEL,
    weight: 3.5,
    value: 500,
  });
  db_rom.db.data.goods.push({
    id: 1,
    name: "Pollo",
    description: "Pollo asado de Mahakam",
    material: Materials.MAKAHAM_STEEL,
    weight: 3.5,
    value: 50,
  });
  db_rom.db.data.merchants.push({
    id: 0,
    name: "Yennefer",
    type: MerchantType.ALCHEMIST,
    location: Locations.KAER_MORHEN,
  });
  
  await db_rom.db.write();

  let db_rom3 = new DB_ROM(); // Nueva instancia con la misma ruta
  await db_rom3.initDB();
  
  db_rom3.db.data.goods.push({
    id: 3,
    name: "tre",
    description: "tre",
    material: Materials.MAKAHAM_STEEL,
    weight: 1.0,
    value: 50,
  });

  await db_rom3.db.write();
  
  console.log("📚 Contenido actual de la base de datos:", db_rom3.db.data);
}

main();



  // async function main() {
  
    
  //   // Inicializamos la base de datos
  //   // await initDB();
  
  //   // // Añadimos un ejemplo de bien
    
  //   // // Mostramos el contenido actual de la base de datos
  //   // console.log("📚 Contenido actual de la base de datos:", db.data);
    
  //   // // Guardamos los cambios en el archivo db.json
  //   // await db.write();
    
  //   // console.log("👽 Base de datos inicializada y con datos.");
  //   new_entry = new DB_ROM();
    
  //   // const db_rom = new DB_ROM();
  //   // db_rom.initialData.goods.push({
  //   //   id: 0,
  //   //   name: "Queso",
  //   //   description: "Forjada con acero de Mahakam, perfecta para cazar monstruos.",
  //   //   material: Materials.MAKAHAM_STEEL,
  //   //   weight: 3.5,
  //   //   value: 500,
  //   // });
  //   // const db_rom2 = new DB_ROM();
  //   // db_rom2.initialData.goods.push({
  //   //   id: 1,
  //   //   name: "Pan",
  //   //   description: "Forjada con acero de Mahakam, perfecta para cazar monstruos.",
  //   //   material: Materials.MAKAHAM_STEEL,
  //   //   weight: 3.5,
  //   //   value: 500,
  //   // });
  //   // await db_rom2.initDB();
  //   // await db_rom.initDB();
  //   // await db_rom2.db.write();
  //   // await db_rom.db.write();
  //   console.log("📚 Contenido actual de la base de datos:", db_rom.db.data);
  //   console.log("👽 Base de datos inicializada y con datos.");
  
  // }