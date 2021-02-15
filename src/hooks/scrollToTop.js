import { useEffect } from 'react'
import { useLocation } from 'react-router'

function UseScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

export default UseScrollToTop
