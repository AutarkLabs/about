import React, { useState } from 'react'

const EditContext = React.createContext()

export function useEditMode() {
  const context = React.useContext(EditContext)
  if (!context) {
    throw new Error('useEditMode must be used within a EditProvider')
  }
  return context
}

export function EditProvider(props) {
  const [ editMode, setEditMode ] = useState(false)

  const value = React.useMemo(() => {
    return { editMode, setEditMode }
  }, [ editMode, setEditMode ])

  return <EditContext.Provider value={value} {...props} />
}

