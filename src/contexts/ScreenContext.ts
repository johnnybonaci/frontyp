import { createContext } from 'react'
import { type ScreenType } from './ScreenProvider.tsx'

const ScreenContext = createContext<ScreenType>({
  changeTitle: () => null,
  screenTitle: undefined,
})

export default ScreenContext
