import { useEffect, useState } from "react"

export function useKeyPress(targetKeys: string[]) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(null)
  const lowercaseTargetKeys = targetKeys.map(keys => keys.toLowerCase())
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: string }) {
    if (lowercaseTargetKeys.includes(key.toLowerCase())) {
      setKeyPressed(key.toLowerCase())
    }
  }

  function upHandler({ key }: { key: string }) {
    if (lowercaseTargetKeys.includes(key.toLowerCase())) {
      setKeyPressed(null)
    }
  }

  // Add event listeners
  useEffect(() => {
    document.addEventListener("keydown", downHandler)
    document.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("keydown", downHandler)
      document.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}
