import { FC, useState } from 'react'
import { BrowserTabsEvent } from './Main'
import { BrowserTabsEventJs } from './Main'

const App: FC = (): JSX.Element => {
  const [key, setKey] = useState<string>('')
  const [isFistTimeLoadApp, setIsFirstTimeLoadApp] = useState<boolean>(false)
  const [isFistTimeLoadTab, setIsFirstTimeLoadTab] = useState<boolean>(false)

  const handleOnFirstTimeLoadApp: any = (
    tabId: string,
    isFirstTimeLoadApp: boolean
  ): void => {
    setKey(tabId)
    setIsFirstTimeLoadApp(isFirstTimeLoadApp)
  }

  const handleOnFirstTimeLoadTab: any = (
    tabId: string,
    isFirstTimeLoadTab: boolean
  ): void => {
    setKey(tabId)
    setIsFirstTimeLoadTab(isFirstTimeLoadTab)
  }

  return (
    <div>
      <h1>key: {key}</h1>
      <h2>Fist time load App: {isFistTimeLoadApp ? 'true' : 'false'}</h2>
      <h2>Fist time load Tab: {isFistTimeLoadTab ? 'true' : 'false'}</h2>

      <BrowserTabsEventJs
        handleOnFirstTimeLoadTab={handleOnFirstTimeLoadTab}
        handleOnFirstTimeLoadApp={handleOnFirstTimeLoadApp}
      />
    </div>
  )
}

export default App
