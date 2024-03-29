import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const resetField = () => {
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    resetField
  }
}
