import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { BroadcastChannel } from 'broadcast-channel'
import { BROADCAST_CHANNEL_TYPES } from './type'

const BROADCAST_CHANNEL = new BroadcastChannel('browser-tabs-event')

const KEYS = {
  STORAGE_BTE_TAB_KEY: 'STORAGE_BTE_TAB_KEY',
  STORAGE_BTE_TAB_IDS_KEY: 'STORAGE_BTE_TAB_IDS_KEY',
  STORAGE_BTE_TAB_ID_LASTEST: 'STORAGE_BTE_TAB_ID_LASTEST'
}

export const BrowserTabsEvent = ({
  handleOnFirstTimeLoadApp = (tabId, isFirstTime) => {},
  handleOnFirstTimeLoadTab = (tabId, isFirstTime) => {},
  handleOnUnMountTab = tabId => {}
}) => {
  const [currentTabKey, setCurrentTabKey] = useState('')

  const getListIds = () => {
    const listStr = localStorage.getItem(KEYS.STORAGE_BTE_TAB_IDS_KEY)

    const list = listStr ? JSON.parse(listStr) : []
    return list
  }
  const setListIds = list => {
    localStorage.setItem(KEYS.STORAGE_BTE_TAB_IDS_KEY, JSON.stringify(list))
  }
  const appendKeyToList = initialTabKey => {
    const list = getListIds()
    const isExist = list.indexOf(initialTabKey) !== -1

    if (!isExist) {
      list.push(initialTabKey)
    }
    setListIds(list)
  }
  const removeKeyFromList = initialTabKey => {
    const list = getListIds()
    const newList = list.filter(key => key !== initialTabKey)
    setListIds(newList)
  }

  const getWindowName = initialTabKey => {
    const config = {
      tabId: initialTabKey
    }

    return JSON.stringify(config)
  }

  const handleOnFirstTimeLoadAppOrAfterCloseAllTabs = initialTabKey => {
    const list = getListIds()

    const isFirstTab = !list.length && !window.name

    handleOnFirstTimeLoadApp(initialTabKey, isFirstTab)
  }

  const handleOnFirstTimeLoadCurrentTab = initialTabKey => {
    const isFirstTime = !window.name

    handleOnFirstTimeLoadTab(initialTabKey, isFirstTime)
  }

  const handleOnReceivedBroadcastMessage = event => {
    if (!event || !event.type) {
      return
    }

    if (event.type === BROADCAST_CHANNEL_TYPES.CLOSED_TAB) {
      handleOnFirstTimeLoadAppOrAfterCloseAllTabs(currentTabKey)
    }
  }

  const setWindowName = initialTabKey => {
    if (!window.name) {
      window.name = getWindowName(initialTabKey)
    }
  }

  const getInitTabKey = () => {
    if (!window.name) {
      return uuid()
    }

    const wName = JSON.parse(window.name)
    if (wName.tabId) {
      return wName.tabId
    }

    return ''
  }

  const handleOnUnMount = initialTabKey => {
    removeKeyFromList(initialTabKey)
    handleOnUnMountTab(initialTabKey)

    BROADCAST_CHANNEL.postMessage({
      type: BROADCAST_CHANNEL_TYPES.CLOSED_TAB,
      payload: {
        tabId: initialTabKey
      }
    })
  }
  useEffect(() => {
    const initialTabKey = getInitTabKey()
    setCurrentTabKey(initialTabKey)

    handleOnFirstTimeLoadAppOrAfterCloseAllTabs(initialTabKey)
    handleOnFirstTimeLoadCurrentTab(initialTabKey)

    setWindowName(initialTabKey)

    appendKeyToList(initialTabKey)

    window.addEventListener('unload', () => handleOnUnMount(initialTabKey))
    BROADCAST_CHANNEL.onmessage = handleOnReceivedBroadcastMessage
    return () => handleOnUnMount(initialTabKey)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
