// import inquirer from 'inquirer';
// import { InventarioService } from '../../services/inventory_stock.js';

// const inventarioService = new InventarioService();

// export const verReportes = async () => {
//   const { reportType } = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'reportType',
//       message: '📊 ¿Qué reporte deseas ver?',
//       choices: [
//         '📦 Estado del stock',
//         '🔥 Bienes más vendidos',
//         '💰 Resumen de ingresos y gastos',
//         '📜 Historial de transacciones',
//         '⬅️ Volver al menú principal'
//       ],
//     },
//   ]);

//   switch (reportType) {
//     case '📦 Estado del stock':
//       console.table(inventarioService.verEstadoStock());
//       break;
//     case '🔥 Bienes más vendidos':
//       console.table(inventarioService.verBienesMasVendidos());
//       break;
//     case '💰 Resumen de ingresos y gastos':
//       console.log(inventarioService.verResumenFinanciero());
//       break;
//     case '📜 Historial de transacciones':
//       //await verHistorialTransacciones();
//       break;
//     case '⬅️ Volver al menú principal':
//       return;
//   }
// };
