import inquirer from "inquirer";
import { Materials } from "../enums/materials.js";

export const inputTest = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID del bien:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del bien:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Descripción del bien:',
    },
    {
      type: 'input',
      name: 'material',
      message: 'Material del bien:',
      choices: Object.values(Materials)
    },
    {
      type: 'input',
      name: 'weight',
      message: 'Peso del bien:',
    },
    {
      type: 'input',
      name: 'value',
      message: 'Valor del bien:',
    },
  ]);
}    


const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Selecciona una opción:',
      choices: [
        'Probar inputTest',
        'Salir'
      ],
    },
  ]);

  switch (answers.option) {
    case 'Probar inputTest':
      await inputTest();
      break;
    case 'Salir':
      console.log('Saliendo...');
      return;
  }

  // Volver a mostrar el menú después de ejecutar una opción
  await mainMenu();
};

// Ejecutar el menú principal
mainMenu();



           