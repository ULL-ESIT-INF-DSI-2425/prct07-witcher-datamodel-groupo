import inquirer from 'inquirer';
import { DBManager } from '../../services/dbmanager.js';
import { searchGood } from '../goods/searchgood.js';

export const reportsMenu = async (dbManager: DBManager) => {
  
  let managing = true;

  while (managing) {
    
    const { reportType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'reportType',
        message: '📊 ¿Qué reporte deseas ver?',
        choices: [
          '📦 Estado del stock',
          '🔥 Bienes más vendidos',
          '💰 Resumen de ingresos y gastos',
          '📜 Historial de transacciones',
          '⬅️ Volver al menú principal'
        ],
      },
    ]);
    
    switch (reportType) {
      case '📦 Estado del stock':
        await searchGood(dbManager.getDBGood());
        break;
      case '🔥 Bienes más vendidos':
        //console.table(inventarioService.verBienesMasVendidos());
        break;
      case '💰 Resumen de ingresos y gastos':
        //console.log(inventarioService.verResumenFinanciero());
        break;
      case '📜 Historial de transacciones':
        //await verHistorialTransacciones();
        break;
      case '⬅️ Volver al menú principal':
        managing = false;
        return;
    }
  }
};
