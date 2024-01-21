import { Thought } from '../data/Thought'
import { DeleteIcon } from './Icons'

type SelectionHandler = (thought: Thought) => void
type OnDeleteHandler = (thought: Thought) => void

export type ThoughtListProps = {
  thoughts: Thought[] | undefined
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
    <div {...rest} className={`${rest.className} relative`}>
      <div className="pointer-events-none absolute -inset-4 z-10 bg-gradient-to-t from-white from-5% dark:from-neutral-800" />
      <header className="text-2xl italic">Meditations</header>
      <ul className="space-y-2 py-4 text-sm md:text-lg">
        {thoughts?.map((thought) => (
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
      <span className="grow truncate" onClick={() => onThoughtClicked(thought)}>
        {thought.text || 'New Thought'}
      </span>
      <DeleteIcon
        className="h-6 w-6 flex-none text-neutral-400"
        onClick={() => onDeleteClicked(thought)}
      />
    </div>
  )
}

export default ThoughtList
