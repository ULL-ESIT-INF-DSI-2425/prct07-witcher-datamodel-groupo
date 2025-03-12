import { db, DataSchema } from '../db/db.js'

export class Inventory {
  async addItem(item: DataSchema): Promise<void> {
    await.read()
    db.data.item.push(item);
    await.write()
  }

  async getItems(){

  }
}