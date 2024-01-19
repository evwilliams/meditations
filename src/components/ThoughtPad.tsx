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
    <textarea
      id='thought-pad'
      ref={textareaRef}
      className={rest.className}
      placeholder="What's on your mind?"
      value={thought.text}
      onChange={(e) => thought.id && onUpdate(thought.id, e.target.value)}
    />
  )
}

export default ThoughtPad
