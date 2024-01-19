import { Thought, newThought } from './Thought'
import { useState } from 'react'
import { db } from './Db'
import { useLiveQuery } from 'dexie-react-hooks'

export const useThoughts = () => {
  const sortedThoughts = useLiveQuery(() =>
    db.thoughts.orderBy('sortValue').reverse().toArray()
  )
  const [activeThought, setActiveThought] = useState<Thought>()

  const createThought = async () => {
    const newId = await db.thoughts.add(newThought())
    const thought = await db.thoughts.get(newId)
    setActiveThought(thought)
  }

  const updateThought = (id: number, text: string) => {
    const changes = {
      text,
      dateModified: new Date(),
      sortValue: Date.now(),
    }

    if (activeThought && activeThought.id === id) {
      setActiveThought({ ...activeThought, ...changes })
    }
    db.thoughts.update(id, changes)
  }

  const focusThought = (t: Thought) => {
    setActiveThought(t)
    t.id &&
      db.thoughts.update(t.id, {
        sortValue: Date.now(),
      })
  }

  const clearThought = (t: Thought) => {
    t.id && db.thoughts.delete(t.id)
  }

  return {
    activeThought,
    sortedThoughts,
    createThought,
    updateThought,
    focusThought,
    clearThought,
  }
}
