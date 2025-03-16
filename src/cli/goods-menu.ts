// import inquirer from "inquirer";
// import { Good } from "../models/good.js";

// export class GoodMenu {
//   static async show() {
//     const choices = [
//       { name: "➕ Agregar bien", value: "add" },
//       { name: "📜 Listar bienes", value: "list" },
//       { name: "🔙 Volver", value: "back" }
//     ];

//     const { option } = await inquirer.prompt([
//       {
//         type: "list",
//         name: "option",
//         message: "📌 Selecciona una opción:",
//         choices
//       }
//     ]);

//     switch (option) {
//       case "add":
//         console.log("Función para agregar un bien aún no implementada.");
//         break;
//       case "list":
//         console.log("Función para listar bienes aún no implementada.");
//         break;
//       case "back":
//         return;
//     }

//     await GoodMenu.show();
//   }
// }

import inquirer from 'inquirer';
import { addGood } from '../acciones/bienes/addGood';
import { deleteGood } from '../acciones/bienes/deleteGood';
import { listGoods } from '../acciones/bienes/listGoods';
import { updateGood } from '../acciones/bienes/updateGood';

export const gestionarBienesMenu = async () => {
  let managing = true;

  while (managing) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Gestión de bienes',
        choices: [
          '📦 Añadir bien',
          '🛑 Eliminar bien',
          '🔍 Consultar bienes',
          '🔄 Modificar bien',
          '⬅️ Volver al menú principal'
        ],
      },
    ]);

    switch (action) {
      case '📦 Añadir bien':
        await addGood();
        break;
      case '🛑 Eliminar bien':
        await deleteGood();
        break;
      case '🔍 Consultar bienes':
        await listGoods();
        break;
      case '🔄 Modificar bien':
        await updateGood();
        break;
      case '⬅️ Volver al menú principal':
        managing = false;
        break;
    }
  }
};
