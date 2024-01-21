type WelcomeProps = {} & React.HTMLAttributes<HTMLDivElement>

const Emph = ({ children }: { children: React.ReactNode }) =>
	<em className='text-neutral-600 dark:text-neutral-200'>{children}</em>

const Welcome = ({ ...rest }: WelcomeProps) => {
	return (
		<div {...rest}>
			<header className="text-2xl italic">Welcome to Meditations</header>
			<div className="leading-relaxed flex flex-col gap-8 py-8 text-neutral-400 text-lg">
				<p>Inspired by Marcus Aurelius.</p>
				<p>A simple notepad for <Emph>"repeating and reframing ideas long familiar but imperfectly absorbed"</Emph>.</p>
				<p>There's <Emph>no server</Emph>, all your notes are <Emph>private & stored locally in this browser.</Emph></p>
				<p>Unlike a notepad, this will <Emph>help resurface past thoughts</Emph>.</p>
				<p><Emph>Press the + button below</Emph> to start collecting your thoughts.</p>
			</div>
		</div>
	)
}

export default Welcome