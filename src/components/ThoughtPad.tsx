import { Thought } from '../data/Thought'

const placeholder =
  'Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize?'

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
      placeholder={placeholder}
      value={thought.text}
      onChange={(e) => thought.id && onUpdate(thought.id, e.target.value)}
    />
  )
}

export default ThoughtPad
