import React, { createContext, useContext } from 'react'

const EditorContext = createContext(null)

export const useEditorContext = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorContext.Provider')
  }
  return context
}

export { EditorContext }