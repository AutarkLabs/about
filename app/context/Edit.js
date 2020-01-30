import React, { useMemo, useState } from 'react'

const EditContext = React.createContext()

export function useEditMode() {
  const context = React.useContext(EditContext)
  if (!context) {
    throw new Error('useEditMode must be used within a EditProvider')
  }
  return context
}

export var EditProvider = props => {
  const [ editMode, setEditMode ] = useState(false)
  const [ editedWidgets, setEditedWidgets ] = useState()

  const value = useMemo(() => {
    return { editMode, editedWidgets, setEditMode, setEditedWidgets }
  }, [ editMode, editedWidgets, setEditMode, setEditedWidgets ])

  return <EditContext.Provider value={value} {...props} />
}