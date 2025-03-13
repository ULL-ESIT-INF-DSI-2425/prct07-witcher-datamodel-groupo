import { initDB, db } from "./db.js"; // Asegúrate de la ruta correcta
import { Materials } from "../enums/materials.js";

async function main() {
  // Inicializamos la base de datos
  await initDB();

  // Añadimos un ejemplo de bien
  db.data!.goods.push({
    id: 1,
    name: "Espada de Plata de Kaer Morhen",
    description: "Forjada con acero de Mahakam, perfecta para cazar monstruos.",
    material: Materials.MAKAHAM_STEEL,
    weight: 3.5,
    value: 500,
  });

  // Guardamos los cambios en el archivo db.json
  await db.write();

  console.log("✅ Base de datos inicializada y con datos.");
}

main();
