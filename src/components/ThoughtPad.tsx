import { Thought } from '../data/Thought'

type UpdateHandler = (id: number, text: string) => void

type ThoughtPadProps = {
  thought: Thought
  onUpdate: UpdateHandler
} & React.HTMLAttributes<HTMLTextAreaElement>

const ThoughtPad = ({ thought, onUpdate, ...rest }: ThoughtPadProps) => {

  return (
    <textarea
      id='thought-pad'
      className={rest.className}
      placeholder="What's on your mind?"
      value={thought.text}
      onChange={(e) => thought.id && onUpdate(thought.id, e.target.value)}
    />
  )
}

export default ThoughtPad
