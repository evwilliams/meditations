import Dexie, { Table } from 'dexie'
import { Thought } from './Thought'

export class MeditationsDb extends Dexie {
  thoughts!: Table<Thought>

  constructor() {
    super('meditationsDb')
    this.version(1).stores({
      thoughts: '++id, sortValue', // Primary key and indexed props
    })
  }
}

export const db = new MeditationsDb()
