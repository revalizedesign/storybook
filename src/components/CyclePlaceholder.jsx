import { createContext, useContext, useEffect, useState } from 'react'

const CyclePlaceholderContext = createContext('')

export function CyclePlaceholderProvider({ children, chunkSize = 5, deleteSpeed = 20, pause = 2000, placeholders, typeSpeed = 60 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = placeholders[index]
    if (!deleting && text === target) {
      const id = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(id)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex(i => (i + 1) % placeholders.length)
      return
    }
    const speed = deleting ? deleteSpeed : typeSpeed
    const id = setTimeout(() => {
      setText(deleting
        ? target.slice(0, Math.max(0, text.length - chunkSize))
        : target.slice(0, Math.min(target.length, text.length + chunkSize))
      )
    }, speed)
    return () => clearTimeout(id)
  }, [chunkSize, deleteSpeed, deleting, index, pause, placeholders, text, typeSpeed])

  return (
    <CyclePlaceholderContext.Provider value={text}>
      {children}
    </CyclePlaceholderContext.Provider>
  )
}

export function useCyclePlaceholder() {
  return useContext(CyclePlaceholderContext)
}
