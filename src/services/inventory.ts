import { db } from '../db/db.js';
import { DataSchema } from '../types/dataschema.js';
import { Good } from '../models/good.js';
import { Merchant } from '../models/merchant.js';
import { Client } from '../models/client.js';
// import { Transaction } from '../types/transaction.js

export class Inventory {
  async add<T extends keyof DataSchema>(key: T, item: DataSchema[T][number]): Promise<void> {
    await db.read(); // Leer la base de datos

    // Asegurar que `db.data` tiene la estructura correcta
    db.data ||= { goods: [], merchants: [], customers: [], transactions: [] };

    // Hacer una validación extra para asegurarse que el tipo de item es el correcto
    if (this.isValidItemForKey(key, item)) {
      db.data[key].push(item); // Insertar el objeto en la clave correcta
      await db.write(); // Guardar cambios
    } else {
      throw new Error(`El tipo de item no corresponde con la clave ${key}`);
    }
  }

  // Función que valida si el item es válido para el tipo de clave (goods, merchants, etc.)
  private isValidItemForKey<T extends keyof DataSchema>(key: T, item: DataSchema[T][number]): boolean {
    switch (key) {
      case 'goods':
        return this.isGood(item);  // Validar si el item es de tipo Good
      case 'merchants':
        return this.isMerchant(item);  // Validar si el item es de tipo Merchant
      case 'customers':
        return this.isCustomer(item);  // Validar si el item es de tipo Customer
      // case 'transactions':
      //   return this.isTransaction(item);  // Validar si el item es de tipo Transaction
      default:
        return false;
    }
  }

  // Ejemplo de función para validar un Good
  private isGood(item: Good): item is Good {
    return item && typeof item.name === 'string'; // Validación básica para Good
  }

  // Validación para Merchant
  private isMerchant(item: Merchant): item is Merchant {
    return item && typeof item.name === 'string' && typeof item.type === 'string';
  }

  // Validación para Customer
  private isCustomer(item: Client): item is Client {
    return item && typeof item.name === 'string' && typeof item.race === 'string';
  }

  // // Validación para Transaction
  // private isTransaction(item: any): item is Transaction {
  //   return item && typeof item.amount === 'number' && typeof item.date === 'string';
  // }

  // Función para obtener todos los items de un tipo específico
  async getAll<T extends keyof DataSchema>(key: T): Promise<DataSchema[T]> {
    await db.read();
    return db.data[key];
  }
}

