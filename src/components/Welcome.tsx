type WelcomeProps = {} & React.HTMLAttributes<HTMLDivElement>

const Welcome = ({ ...rest }: WelcomeProps) => {
	const lines = [
		`A simple tool for "repeating and reframing ideas long familiar but imperfectly absorbed", inspired by Marcus Aurelius' practice of writing found in Meditations.`,
		`There's no server, all your notes are local to this browser.`,
		`Unlike a notepad, this will resurface past thoughts so you can reflect and refine.`,
		`Press the + button below to start collecting your thoughts.`,
	]
	return (
		<div {...rest}
			className={`${rest.className} + leading-relaxed flex flex-col gap-2`}>
			<header className="text-2xl italic">Welcome to Meditations</header>
			{lines.map(l => <p>{l}</p>)}
		</div>
	)
}

export default Welcome