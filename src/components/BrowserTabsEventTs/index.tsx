import { FC, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { BroadcastChannel } from 'broadcast-channel'
import {
  BROADCAST_CHANNEL_TYPES,
  IProps,
  IBroadcastMessageData,
  IWindowName
} from './type.d'

const BROADCAST_CHANNEL = new BroadcastChannel('browser-tabs-event')

enum KEYS {
  STORAGE_BTE_TAB_KEY = 'STORAGE_BTE_TAB_KEY',
  STORAGE_BTE_TAB_IDS_KEY = 'STORAGE_BTE_TAB_IDS_KEY',
  STORAGE_BTE_TAB_ID_LASTEST = 'STORAGE_BTE_TAB_ID_LASTEST'
}

export const BrowserTabsEventTs: FC<IProps> = ({
  handleOnFirstTimeLoadApp = (
    tabId?: string,
    isFirstTime?: boolean
  ): void => {},
  handleOnFirstTimeLoadTab = (tabId?: string, isFirstTime?: boolean): void => {}
}: IProps): JSX.Element => {
  const [currentTabKey, setCurrentTabKey] = useState<string>('')

  const getListIds: any = (): string[] => {
    const listStr: string | null = localStorage.getItem(
      KEYS.STORAGE_BTE_TAB_IDS_KEY
    )

    const list: string[] = listStr ? JSON.parse(listStr) : []
    return list
  }
  const setListIds: any = (list: string[]): void => {
    localStorage.setItem(KEYS.STORAGE_BTE_TAB_IDS_KEY, JSON.stringify(list))
  }
  const appendKeyToList: any = (initialTabKey: string): void => {
    const list: string[] = getListIds()
    const isExist: boolean = list.indexOf(initialTabKey) !== -1

    if (!isExist) {
      list.push(initialTabKey)
    }
    setListIds(list)
  }
  const removeKeyFromList: any = (initialTabKey: string): void => {
    const list: string[] = getListIds()
    const newList: string[] = list.filter(
      (key: string): boolean => key !== initialTabKey
    )
    setListIds(newList)
  }

  const getWindowName: any = (initialTabKey: string): string => {
    const config: IWindowName = {
      tabId: initialTabKey
    }

    return JSON.stringify(config)
  }

  const handleOnFirstTimeLoadAppOrAfterCloseAllTabs: any = (
    initialTabKey: string
  ): void => {
    const list: string[] = getListIds()

    const isFirstTab: boolean = !list.length && !window.name

    handleOnFirstTimeLoadApp(initialTabKey, isFirstTab)
  }

  const handleOnFirstTimeLoadCurrentTab: any = (
    initialTabKey: string
  ): void => {
    const isFirstTime: boolean = !window.name

    handleOnFirstTimeLoadTab(initialTabKey, isFirstTime)
  }

  const handleOnReceivedBroadcastMessage: any = (
    event: IBroadcastMessageData
  ): void => {
    if (!event || !event.type) {
      return
    }

    if (event.type === BROADCAST_CHANNEL_TYPES.CLOSED_TAB) {
      handleOnFirstTimeLoadAppOrAfterCloseAllTabs(currentTabKey)
    }
  }

  const setWindowName: any = (initialTabKey: string): void => {
    if (!window.name) {
      window.name = getWindowName(initialTabKey)
    }
  }

  const getInitTabKey: any = (): string => {
    if (!window.name) {
      return uuid()
    }

    const wName: any = JSON.parse(window.name)
    if (wName.tabId) {
      return wName.tabId
    }

    return ''
  }

  const handleOnUnMount: any = (initialTabKey: string): void => {
    removeKeyFromList(initialTabKey)

    BROADCAST_CHANNEL.postMessage({
      type: BROADCAST_CHANNEL_TYPES.CLOSED_TAB,
      payload: {
        tabId: initialTabKey
      }
    })
  }
  useEffect((): any => {
    const initialTabKey: string = getInitTabKey()
    setCurrentTabKey(initialTabKey)

    handleOnFirstTimeLoadAppOrAfterCloseAllTabs(initialTabKey)
    handleOnFirstTimeLoadCurrentTab(initialTabKey)

    setWindowName(initialTabKey)

    appendKeyToList(initialTabKey)

    window.addEventListener('unload', () => handleOnUnMount(initialTabKey))
    BROADCAST_CHANNEL.onmessage = handleOnReceivedBroadcastMessage
    return () => handleOnUnMount(initialTabKey)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <></>
}
