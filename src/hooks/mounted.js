import { useEffect, useRef } from 'react'

//check if the component is mounted or not
function useMounted() {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}

export default useMounted
