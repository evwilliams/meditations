import './App.css'
import { useThoughts } from './data/ThoughtStore';
import ThoughtList from './components/ThoughtList';
import ThoughtPad from './components/ThoughtPad';

function App() {
  const {
    thoughts,
    newThought,
    updateThought,
    focusThought,
    clearThought,
  } = useThoughts()

  return (
    <div>
      <ThoughtList thoughts={thoughts} selectionHandler={focusThought} onDeleteClicked={clearThought} />
      <ThoughtPad thought={thoughts[0]} onUpdate={updateThought} />
      <button onClick={newThought}>New Thought</button>
    </div>
  )
}

export default App
