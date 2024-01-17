import { Thought } from "../data/Thought"

type UpdateHandler = (t: Thought) => void
const ThoughtPad = ({ thought, onUpdate }: { thought: Thought, onUpdate: UpdateHandler }) => {

	return (
		<textarea
			placeholder="What's on your mind?"
			value={thought.text}
			onChange={(e) => onUpdate({ ...thought, text: e.target.value })}
		/>
	)
}

export default ThoughtPad