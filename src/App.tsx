import { useThoughts } from './data/ThoughtStore'
import ThoughtList from './components/ThoughtList'
import ThoughtPad from './components/ThoughtPad'
import { useState } from 'react'
import { CogIcon, ListIcon, PlusIcon } from './components/Icons'
import { Thought } from './data/Thought'
import SettingsList from './components/SettingsList'

type TabKey = 'list' | 'write' | 'settings'

function App() {
  const { thoughts, newThought, updateThought, focusThought, clearThought } =
    useThoughts()

  const [activeTab, setActiveTab] = useState<TabKey>('write')

  const tabPressed = (tabKey: TabKey) => {
    setActiveTab(tabKey === activeTab ? 'write' : tabKey)
  }

  const selectThought = (t: Thought) => {
    focusThought(t)
    setActiveTab('write')
  }

  const createThought = () => {
    newThought()
    setActiveTab('write')
  }

  const tabs = {
    list: (
      <ThoughtList
        className="w-full"
        thoughts={thoughts}
        selectionHandler={selectThought}
        onDeleteClicked={clearThought}
      />
    ),
    write: (
      <ThoughtPad
        className="w-full resize-none text-2xl focus:outline-none"
        thought={thoughts[0]}
        onUpdate={updateThought}
      />
    ),
    settings: <SettingsList className="w-full" />,
  }

  return (
    <div className="App flex h-dvh w-full flex-col items-center align-top font-serif text-neutral-800">
      <div className="Content flex h-full w-full grow p-8 lg:px-96">
        {tabs[activeTab]}
      </div>

      <div className="Buttons flex flex-row items-center justify-center gap-16 py-2 lg:py-16">
        <ListIcon
          className="h-6 w-6 text-neutral-400"
          onClick={() => tabPressed('list')}
        />
        <PlusIcon
          className="h-12 w-12 text-neutral-800"
          onClick={createThought}
        />
        <CogIcon
          className="h-6 w-6 text-neutral-400"
          onClick={() => tabPressed('settings')}
        />
      </div>
    </div>
  )
}

export default App
