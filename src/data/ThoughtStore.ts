import { Thought, newThought } from './Thought'
import { useEffect, useReducer } from 'react'

const storageKey = 'thoughts'

type Action =
  | { type: 'create' }
  | { type: 'update'; thought: Thought }
  | { type: 'clear'; id: string }
  | { type: 'focus'; thought: Thought }

const reducer = (thoughts: Thought[], action: Action) => {
  switch (action.type) {
    case 'create': {
      return [newThought(), ...thoughts]
    }
    case 'update': {
      return thoughts.map((t) =>
        t.id === action.thought.id ? action.thought : t
      )
    }
    case 'clear': {
      return thoughts.filter((t) => t.id !== action.id)
    }
    case 'focus': {
      return [
        action.thought,
        ...thoughts.filter((t) => t.id !== action.thought.id),
      ]
    }
  }
}

const loadThoughts = (storageKey: string) => {
  const existingThoughts = localStorage.getItem(storageKey)
  return existingThoughts ? JSON.parse(existingThoughts) : [newThought()]
}

const storeThoughts = (thoughts: Thought[]) => {
  localStorage.setItem(storageKey, JSON.stringify(thoughts))
}

export const useThoughts = () => {
  const [thoughts, dispatch] = useReducer(reducer, loadThoughts(storageKey))

  useEffect(() => {
    storeThoughts(thoughts)
  }, [thoughts])

  const newThought = () => {
    dispatch({ type: 'create' })
  }

  const updateThought = (thought: Thought) => {
    thought.dateModified = new Date()
    dispatch({ type: 'update', thought: thought })
  }

  const focusThought = (thought: Thought) => {
    dispatch({ type: 'focus', thought: thought })
  }

  const clearThought = (id: string) => {
    dispatch({ type: 'clear', id: id })
  }

  return {
    thoughts,
    newThought,
    updateThought,
    focusThought,
    clearThought,
  }
}
