import { type FC, useEffect } from 'react'
import { type PrivateScreenTitleProps } from './types'
import useScreen from 'hooks/useScreen.ts'

const PrivateScreenTitle: FC<PrivateScreenTitleProps> = ({ title }) => {
  const { changeTitle } = useScreen()

  useEffect(() => {
    changeTitle(title)
  }, [title, changeTitle])

  return null
}

export default PrivateScreenTitle
