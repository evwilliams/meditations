import { RememberWhen, useThoughts } from './data/ThoughtStore'
import ThoughtList from './components/ThoughtList'
import ThoughtPad from './components/ThoughtPad'
import { useState } from 'react'
import { CogIcon, ListIcon, PlusIcon } from './components/Icons'
import { Thought } from './data/Thought'
import SettingsList from './components/SettingsList'
import Welcome from './components/Welcome'

type TabKey = 'list' | 'write' | 'settings'

function App() {
  const {
    activeThought,
    sortedThoughts,
    createThought,
    updateThought,
    focusThought,
    clearThought,
    rememberThought,
  } = useThoughts()

  const [activeTab, setActiveTab] = useState<TabKey>('write')

  const tabPressed = (tabKey: TabKey) => {
    setActiveTab(tabKey === activeTab ? 'write' : tabKey)
  }

  const plusPressed = async () => {
    if (!activeThought || activeThought.text.length > 0)
      await createThought()
    setActiveTab('write')
  }

  const selectThought = (t: Thought) => {
    focusThought(t)
    setActiveTab('write')
  }

  const rememberPressed = async (thoughtId: number, when: RememberWhen) => {
    await rememberThought(thoughtId, when)
  }

  if (!sortedThoughts) return null

  const tabs = {
    list: (
      <ThoughtList
        className="w-full"
        thoughts={sortedThoughts}
        selectionHandler={selectThought}
        onDeleteClicked={clearThought}
      />
    ),
    write: (
      activeThought ? <ThoughtPad
        className="w-full"
        thought={activeThought}
        onUpdate={updateThought}
        onRemember={rememberPressed}
      /> : <Welcome />
    ),
    settings: <SettingsList className="w-full" />,
  }

  return (
    <div className="App flex h-dvh w-full flex-col items-center align-top font-serif text-neutral-800">
      <div className="Content flex h-full w-full grow pt-8 pb-2 px-8 lg:px-96">
        {tabs[activeTab]}
      </div>

      <div className="Buttons flex flex-row items-center justify-center gap-16 py-4 lg:pb-12">
        <ListIcon
          className="h-6 w-6 text-neutral-400"
          onClick={() => tabPressed('list')}
        />
        <PlusIcon
          className="h-12 w-12 text-neutral-800"
          onClick={plusPressed}
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
