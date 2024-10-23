import { useContext } from 'react'
import { type ScreenType } from '../contexts/ScreenProvider.tsx'
import ScreenContext from '../contexts/ScreenContext.ts'

const useScreen = (): ScreenType => useContext(ScreenContext)

export default useScreen
