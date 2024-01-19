import { useEffect, useRef } from 'react'
import { Thought } from '../data/Thought'

type UpdateHandler = (id: number, text: string) => void

type ThoughtPadProps = {
  thought: Thought
  onUpdate: UpdateHandler
} & React.HTMLAttributes<HTMLTextAreaElement>

const ThoughtPad = ({ thought, onUpdate, ...rest }: ThoughtPadProps) => {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    focusTextArea()
  }, [])

  useEffect(() => {
    if (thought.text == '')
      focusTextArea()
  }, [thought])

  const focusTextArea = () => {
    if (!textareaRef.current || !window.isMobileDevice()) return
    textareaRef.current.focus()
    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = thought.text.length;
  }

  return (
    <div className={`${rest.className} flex flex-col gap-4 items-center`}>
      <textarea
        id='thought-pad'
        ref={textareaRef}
        className="w-full grow resize-none text-2xl focus:outline-none"
        placeholder="What's on your mind?"
        value={thought.text}
        onChange={(e) => thought.id && onUpdate(thought.id, e.target.value)}
      />
      <div className='grow-0 gap-4 flex flex-row'>
        <button className='border px-4 py-1 rounded-sm text-neutral-400'>Remember Later</button>
        <button className='border px-4 py-1 rounded-sm text-neutral-400'>Remember Soon</button>
      </div>
    </div>

  )
}

export default ThoughtPad
