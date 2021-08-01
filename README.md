# Detect Browser's Tab Events

You can subscribe window tabs event with following support functions:

- `handleOnFirstTimeLoadApp`

  - All tab was closed (or the first time load application in current browser)
    - If you close all tabs, then access again, it's mean you are access at the first time

- `handleOnFirstTimeLoadTab`

  - First time load tab

- `handleOnUnMountTab`
  - Handle on a tab is closing

TS way

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

  // handle on unmount tab
  const handleOnUnMountTab = (tabId: string): void => {}

  // ...
  return (
    <BrowserTabsEvent
      handleOnFirstTimeLoadApp={handleOnFirstTimeLoadApp}
      handleOnFirstTimeLoadTab={handleOnFirstTimeLoadTab}
      handleOnUnMountTab={handleOnUnMountTab}
    />
  )
}
```

JS way

```jsx
import { BrowserTabsEvent } from 'browser-tabs-event'

const App = () => {
  // first time load app
  const handleOnFirstTimeLoadApp = (tabId, isFirstTimeLoadApp) => {}

  // first time load tab
  const handleOnFirstTimeLoadTab = (tabId, isFirstTimeLoadTab) => {}

  // handle on unmount tab
  const handleOnUnMountTab = tabId => {}

  // ...
  return (
    <BrowserTabsEvent
      handleOnFirstTimeLoadApp={handleOnFirstTimeLoadApp}
      handleOnFirstTimeLoadTab={handleOnFirstTimeLoadTab}
      handleOnUnMountTab={handleOnUnMountTab}
    />
  )
}
```

## Setting

```
npm i -s browser-tabs-event
```
