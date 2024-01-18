import { Thought } from '../data/Thought'

const placeholder =
  'Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize?'

type UpdateHandler = (t: Thought) => void

type ThoughtPadProps = {
  thought: Thought
  onUpdate: UpdateHandler
} & React.HTMLAttributes<HTMLTextAreaElement>

const ThoughtPad = ({ thought, onUpdate, ...rest }: ThoughtPadProps) => {
  return (
    <textarea
      className={rest.className}
      placeholder={placeholder}
      value={thought?.text}
      onChange={(e) => onUpdate({ ...thought, text: e.target.value })}
    />
  )
}

export default ThoughtPad
