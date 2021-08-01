# Detect Browser's Tab Events

You can subcribe windows tab event with the list bellow:

- All tab was closed (equal the first time load app in current browser)
- Firt time load tab

```tsx
import { BrowserTabsEvent } from 'browser-tabs-event'

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
npm i -s browser-tabs-event
```
