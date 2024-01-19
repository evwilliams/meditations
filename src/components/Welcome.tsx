type WelcomeProps = {} & React.HTMLAttributes<HTMLDivElement>

const Welcome = ({ ...rest }: WelcomeProps) => {
	return (
		<div {...rest}>
			<header className="text-2xl italic">Welcome to Meditations</header>
			<div className="leading-relaxed flex flex-col gap-4 py-4 text-neutral-500">
				<p>A simple tool for <em className='text-neutral-900'>"repeating and reframing ideas long familiar but imperfectly absorbed"</em>, inspired by Marcus Aurelius' practice of writing found in Meditations.</p>
				<p>There's <em className='text-neutral-900'>no server</em>, all your notes are <em className='text-neutral-900'>private & stored locally in this browser.</em></p>
				<p>Unlike a notepad, this will <em className='text-neutral-900'>resurface past thoughts</em> so you can reflect and refine.</p>
				<p><em className='text-neutral-900'>Press the + button below</em> to start collecting your thoughts.</p>
			</div>
		</div>
	)
}

export default Welcome