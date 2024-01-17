import { Thought } from "../data/Thought"

type SelectionHandler = (thought: Thought) => void
type OnDeleteHandler = (id: string) => void

export type ThoughtListProps = {
	thoughts: Thought[],
	selectionHandler: SelectionHandler,
	onDeleteClicked: OnDeleteHandler
}

const ThoughtList = ({ thoughts, selectionHandler, onDeleteClicked }: ThoughtListProps) => {
	return (
		<div>
			<header>Thoughts</header>
			<ul>
				{thoughts.map((thought) => (
					<li key={thought.id}>
						<ThoughtListItem thought={thought} onThoughtClicked={selectionHandler} onDeleteClicked={onDeleteClicked} />
					</li>
				))}
			</ul>
		</div>
	)
}

type ThoughtListItemProps = {
	thought: Thought,
	onThoughtClicked: SelectionHandler,
	onDeleteClicked: OnDeleteHandler
}

const ThoughtListItem = ({ thought, onThoughtClicked, onDeleteClicked }: ThoughtListItemProps) => {
	return (
		<>
			<span onClick={() => onThoughtClicked(thought)}>
				{thought.text || "New Thought"}
			</span>
			<button onClick={() => onDeleteClicked(thought.id)}>X</button>
		</>
	)
}


export default ThoughtList