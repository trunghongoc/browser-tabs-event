export enum BROADCAST_CHANNEL_TYPES {
  SIGN_OUT = 'SIGN_OUT',
  CLOSED_TAB = 'CLOSED_TAB',
  SIGN_IN = 'SIGN_IN'
}

export interface IProps {
  // first time load app, or after close all tabs
  handleOnFirstTimeLoadApp?: any
  handleOnFirstTimeLoadTab?: any
  handleOnUnMountTab?: any
}

export interface IBroadcastMessageData {
  type: BROADCAST_CHANNEL_TYPES
  payload?: object
}

export interface IWindowName {
  tabId: string
}
