import inquirer from 'inquirer';
import { GoodMenu } from './goods-menu.js';
import { gestionarClientesMenu } from './menus/clientesMenu';
import { gestionarMercaderesMenu } from './menus/mercaderesMenu';
import { registrarTransaccion } from './acciones/registrarTransaccion';
import { verReportes } from './acciones/verReportes';

// Menú principal
const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '¿Qué deseas hacer en el sistema?',
      choices: [
        '🏹 Gestionar bienes',
        '🛡️ Gestionar clientes',
        '🔥 Gestionar mercaderes',
        '💰 Registrar una transacción',
        '📊 Ver reportes',
        '❌ Salir'
      ],
    },
  ]);

  return answers.action;
};

const runApp = async () => {
  let running = true;

  while (running) {
    const action = await mainMenu();

    switch (action) {
      case '🏹 Gestionar bienes':
        await GoodMenu();
        break;
      case '🛡️ Gestionar clientes':
        await gestionarClientesMenu();
        break;
      case '🔥 Gestionar mercaderes':
        await gestionarMercaderesMenu();
        break;
      case '💰 Registrar una transacción':
        await registrarTransaccion();
        break;
      case '📊 Ver reportes':
        await verReportes();
        break;
      case '❌ Salir':
        running = false;
        console.log('👋 Saliendo del sistema...');
        break;
    }
  }
};

runApp();

/*
 

*/