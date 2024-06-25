import { useEffect, useState } from 'react'

export type BreakpointType = 'desktop' | 'tablet' | 'mobile'
export type ScreenSize = { width: number; height: number }

const getBreakpoint = (screenSize: ScreenSize) => {
  return screenSize.width < 768 ? 'mobile' : screenSize.width < 1366 ? 'tablet' : 'desktop'
}

export default function useResponsiveScr() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(getBreakpoint(screenSize))

  const syncUpScreenSize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    setBreakpoint(getBreakpoint({ width: window.innerWidth, height: window.innerHeight }))
  }

  useEffect(() => {
    syncUpScreenSize()

    window.addEventListener('resize', syncUpScreenSize)

    return () => {
      window.removeEventListener('resize', syncUpScreenSize)
    }
  }, [])

  return { screenSize, breakpoint }
}
