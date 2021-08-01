# Detech Browser's Tab Events

You can subcribe windows tab event when it closed, or when all all tabs was closed

```tsx
import { BrowserTabsEvent } from './components/BrowserTabsEvent'

const App: FC = (): JSX.Element => {
  // first time load app
  const handleOnFirstTimeLoadApp: any = (
    tabId: string,
    isFirstTimeLoadApp: boolean
  ): void => {}

  // first time load tab
  const handleOnFirstTimeLoadTab: any = (
    tabId: string,
    isFirstTimeLoadTab: boolean
  ): void => {}

  // ...
  return (
    <BrowserTabsEvent
      handleOnFirstTimeLoadApp={handleOnFirstTimeLoadApp}
      handleOnFirstTimeLoadTab={handleOnFirstTimeLoadTab}
    />
  )
}
```

## Seting

```
npm i -s browser-tab-event
```
