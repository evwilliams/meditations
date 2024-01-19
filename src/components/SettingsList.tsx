import { DownloadIcon } from './Icons'
import { useThoughts } from '../data/ThoughtStore'
import { download } from '../Utils'

type SettingsProps = {} & React.HTMLAttributes<HTMLDivElement>

const SettingsList = ({ ...rest }: SettingsProps) => {
  const { sortedThoughts } = useThoughts()

  return (
    <div {...rest}>
      <header className="text-2xl">Settings</header>

      <ul className="space-y-2 py-4 text-sm md:text-lg">
        <li key="export">
          <button
            className="flex flex-row items-center gap-2"
            onClick={() => download(sortedThoughts, 'meditations.json')}
          >
            <span className="grow">Export thoughts as json</span>
            <DownloadIcon className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SettingsList
