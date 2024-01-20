import { Thought, newThought } from './Thought'
import { useEffect, useState } from 'react'
import { db } from './Db'
import { useLiveQuery } from 'dexie-react-hooks'
import { clampFloor } from '../Utils'

export type RememberWhen = 'soon' | 'later'

export const useThoughts = () => {
  const sortedThoughts = useLiveQuery(() =>
    db.thoughts.orderBy('sortValue').reverse().toArray()
  )
  const [activeThought, setActiveThought] = useState<Thought>()

  useEffect(() => {
    if (
      sortedThoughts &&
      sortedThoughts.length > 0 &&
      (!activeThought || activeThought != sortedThoughts[0])
    ) {
      setActiveThought(sortedThoughts[0])
    }
  }, [sortedThoughts])

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

  const soonIndex = (length: number) => {
    return length * 0.15 + (length / 2) * Math.random()
  }

  const laterIndex = (length: number) => {
    const middle = length / 2
    return middle + length * Math.random()
  }

  const rememberThought = async (thoughtId: number, when: RememberWhen) => {
    if (!sortedThoughts || sortedThoughts.length < 2) return

    const index = clampFloor(
      when === 'soon'
        ? soonIndex(sortedThoughts.length)
        : laterIndex(sortedThoughts.length),
      0,
      sortedThoughts.length - 1
    )
    const newSortValue = sortedThoughts[index].sortValue - 1
    await db.thoughts.update(thoughtId, {
      sortValue: newSortValue,
    })
  }

  const clearThought = async (t: Thought) => {
    if (activeThought && activeThought.id === t.id) {
      setActiveThought(undefined)
    }
    return t.id && db.thoughts.delete(t.id)
  }

  const countThoughts = () => {
    return db.thoughts.count()
  }

  return {
    activeThought,
    sortedThoughts,
    createThought,
    updateThought,
    focusThought,
    clearThought,
    rememberThought,
    countThoughts,
  }
}
