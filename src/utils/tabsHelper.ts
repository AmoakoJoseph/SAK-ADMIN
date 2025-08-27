import React from 'react'

export interface TabItem {
  key: string
  label: string
  children: React.ReactNode
  disabled?: boolean
  closable?: boolean
}

export const createTabItems = (items: TabItem[]) => {
  return items.map(item => ({
    key: item.key,
    label: item.label,
    children: item.children,
    disabled: item.disabled,
    closable: item.closable,
  }))
}
