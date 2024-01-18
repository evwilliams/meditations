import { randomID } from '../Utils'

export type Thought = {
  id: string
  text: string
  dateCreated: Date
  dateModified?: Date
}

export const newThought = (): Thought => {
  return { id: randomID(), text: '', dateCreated: new Date() }
}
