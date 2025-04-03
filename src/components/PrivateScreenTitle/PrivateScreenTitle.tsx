import { type FC, useEffect } from 'react'
import { type PrivateScreenTitleProps } from './types'
import useScreen from 'hooks/useScreen.ts'

const PrivateScreenTitle: FC<PrivateScreenTitleProps> = ({ title }) => {
  const { changeTitle, screenTitle } = useScreen()

  useEffect(() => {
    if (title !== screenTitle) {
      changeTitle(title)
    }
  }, [title, screenTitle, changeTitle])

  return null
}

export default PrivateScreenTitle
