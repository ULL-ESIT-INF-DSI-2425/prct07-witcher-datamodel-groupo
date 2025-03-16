// import { describe, expect, it } from 'vitest';
// import { DB_ROM } from '../../src/db/db_class.js';
// import { Materials } from '../../src/enums/materials.js';
// import { MerchantType } from '../../src/enums/merchantType.js';
// import { Locations } from '../../src/enums/locations.js';

// describe('DB_ROM class', () => {
//   it ('Should be defined', () => {
//     expect(DB_ROM).toBeDefined();
//   })
//   it ('Should create a new instance of DB_ROM', () => {
//     const db = new DB_ROM();
//     expect(db).toBeInstanceOf(DB_ROM);
//   })
//   it ('Should create a new instance of DB_ROM with the default path', () => {
//     const db = new DB_ROM();
//     expect(db.filePath).toBe('./src/db/db.json');
//   })
//   it ('Should create a new instance of DB_ROM with the default initial data', () => {
//     const db = new DB_ROM();
//     expect(db.initialData).toEqual({ goods: [], merchants: [], customers: [], transactions: [] });
//   })
//   it ('Should create a new instance of DB_ROM with a custom path', () => {
//     const db = new DB_ROM('./src/db/db_test.json');
//     expect(db.filePath).toBe('./src/db/db_test.json');
//   })
//   it ('Should create a new instance of DB_ROM with a custom initial data', () => {
//     const db = new DB_ROM('./src/db/db_test.json', { goods: [], merchants: [], customers: [], transactions: [1, 2, 3] });
//     expect(db.initialData).toEqual({ goods: [], merchants: [], customers: [], transactions: [1, 2, 3] });
//   })
//   it ('Should create a new instance of DB_ROM with the default path and initial data', () => {
//     const db = new DB_ROM();
//     expect(db.filePath).toBe('./src/db/db.json');
//     expect(db.initialData).toEqual({ goods: [], merchants: [], customers: [], transactions: [] });
//   })
//   it ('Creation of a new instance of DB_ROM with data', async () => {
//     const db_test = new DB_ROM();
//     await db_test.initDB();
//     db_test.db.data.goods.push({
//       id: 1,
//       name: 'Makaham Steel Sword',
//       description: 'A sword made of the finest steel from Mahakam',
//       material: Materials.MAKAHAM_STEEL,
//       weight: 3.5,
//       value: 500,
//     });
//     db_test.db.data.merchants.push({
//       id: 2,
//       name: 'Yennefer',
//       type: MerchantType.ALCHEMIST,
//       location: Locations.KAER_MORHEN,
//     })
//     await db_test.db.write(); 
//   });
// })

// describe('DB_ROM class creating an object', async() => {
//   const db_test = new DB_ROM();
//   await db_test.initDB();
//   db_test.db.data.goods.push({
//     id: 1,
//     name: 'Makaham Steel Sword',
//     description: 'A sword made of the finest steel from Mahakam',
//     material: Materials.MAKAHAM_STEEL,
//     weight: 3.5,
//     value: 500,
//   });
//   db_test.db.data.merchants.push({
//     id: 2,
//     name: 'Yennefer',
//     type: MerchantType.ALCHEMIST,
//     location: Locations.KAER_MORHEN,
//   })
//   await db_test.db.write();
//   it ('Should create a new instance of DB_ROM with data', async() => {
//     expect(db_test.db.data).toEqual({ goods: [ { id: 1, name: 'Makaham Steel Sword', description: 'A sword made of the finest steel from Mahakam', material: Materials.MAKAHAM_STEEL, weight: 3.5, value: 500 } ], merchants: [ { id: 2, name: 'Yennefer', type: MerchantType.ALCHEMIST, location: Locations.KAER_MORHEN } ], customers: [], transactions: [] });
//   });

// });