import { useEffect, useRef } from 'react'
import { Thought } from '../data/Thought'
import { RememberWhen } from '../data/ThoughtStore'

type UpdateHandler = (id: number, text: string) => void
type RememberHandler = (id: number, when: RememberWhen) => void

type ThoughtPadProps = {
  thought: Thought
  showRememberButtons: boolean
  onUpdate: UpdateHandler
  onRemember: RememberHandler
} & React.HTMLAttributes<HTMLTextAreaElement>

const ThoughtPad = ({
  thought,
  showRememberButtons,
  onUpdate,
  onRemember,
  ...rest
}: ThoughtPadProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    focusTextArea()
  }, [])

  useEffect(() => {
    if (thought.text == '') focusTextArea()
  }, [thought])

  const focusTextArea = () => {
    if (!textareaRef.current || window.isMobileDevice()) return
    textareaRef.current.focus()
    textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
      thought.text.length
  }

  return (
    <div className={`${rest.className} flex flex-col items-center gap-4`}>
      <textarea
        id="thought-pad"
        ref={textareaRef}
        className="w-full grow resize-none bg-transparent text-2xl focus:outline-none"
        placeholder="What's on your mind?"
        value={thought.text}
        onChange={(e) => thought.id && onUpdate(thought.id, e.target.value)}
      />
      {showRememberButtons && (
        <div className="flex grow-0 flex-row gap-4">
          <button
            className="rounded-sm border border-neutral-400 px-4 py-1 text-sm text-neutral-400"
            onClick={() => thought.id && onRemember(thought.id, 'later')}
          >
            Remember Later
          </button>
          <button
            className="rounded-sm border border-neutral-400 px-4 py-1 text-sm text-neutral-400"
            onClick={() => thought.id && onRemember(thought.id, 'soon')}
          >
            Remember Soon
          </button>
        </div>
      )}
    </div>
  )
}

export default ThoughtPad
