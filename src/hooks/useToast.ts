import { useState, useCallback } from 'react'

export const useToast = () => {
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setIsVisible(true)
  }, [])

  const hideToast = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    message,
    isVisible,
    showToast,
    hideToast
  }
}