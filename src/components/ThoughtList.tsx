import { Thought } from '../data/Thought'
import { DeleteIcon } from './Icons'

type SelectionHandler = (thought: Thought) => void
type OnDeleteHandler = (id: string) => void

export type ThoughtListProps = {
  thoughts: Thought[]
  selectionHandler: SelectionHandler
  onDeleteClicked: OnDeleteHandler
} & React.HTMLAttributes<HTMLDivElement>

const ThoughtList = ({
  thoughts,
  selectionHandler,
  onDeleteClicked,
  ...rest
}: ThoughtListProps) => {
  return (
    <div {...rest}>
      <header className="text-2xl italic">Meditations</header>
      <ul className="space-y-2 py-4 text-sm md:text-lg">
        {thoughts.map((thought) => (
          <li key={thought.id}>
            <ThoughtListItem
              thought={thought}
              onThoughtClicked={selectionHandler}
              onDeleteClicked={onDeleteClicked}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

type ThoughtListItemProps = {
  thought: Thought
  onThoughtClicked: SelectionHandler
  onDeleteClicked: OnDeleteHandler
}

const ThoughtListItem = ({
  thought,
  onThoughtClicked,
  onDeleteClicked,
}: ThoughtListItemProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <span onClick={() => onThoughtClicked(thought)} className="grow truncate">
        {thought.text || 'New Thought'}
      </span>
      <DeleteIcon
        className="h-6 w-6 flex-none text-neutral-400"
        onClick={() => onDeleteClicked(thought.id)}
      />
    </div>
  )
}

export default ThoughtList
