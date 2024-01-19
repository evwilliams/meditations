export type Thought = {
  id?: number
  text: string
  dateCreated: Date
  dateModified?: Date
  sortValue: number
}

export const newThought = (): Thought => {
  return {
    text: '',
    dateCreated: new Date(),
    dateModified: new Date(),
    sortValue: Date.now(),
  }
}
