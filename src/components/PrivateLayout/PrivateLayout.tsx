import { type FC, memo, useCallback, useEffect, useState } from 'react'
import c from 'classnames'
import { useLocation } from 'react-router-dom'
import styles from './privateLayout.module.scss'
import { type PrivateLayoutProps } from 'components/PrivateLayout/types'
import AuthorizedNavBar from 'components/AuthorizedNavBar'
import AuthorizedMainContent from 'components/AuthorizedMainContent'
import AuthorizedHeader from 'components/AuthorizedHeader'
import useSidebarComponents from 'src/hooks/useSidebarComponents'

const PrivateLayout: FC<PrivateLayoutProps> = ({
  sidebar: Sidebar = AuthorizedNavBar,
  header: Header = AuthorizedHeader,
  mainContent: MainContent = AuthorizedMainContent,
  sidebarComponents = useSidebarComponents().components,
  children,
}) => {
  const [visibleMobileSideBar, setVisibleMobileSideBar] = useState(false)
  const [collapsedSideBar, setCollapsedSideBar] = useState(false)

  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setVisibleMobileSideBar(false)
      setCollapsedSideBar(false)
    }, 100)
  }, [location])

  const handleClickMenu = useCallback(() => {
    setCollapsedSideBar((prevCollapsedSideBar) => !prevCollapsedSideBar)
  }, [])

  return (
    <div className={c(styles.mainWrapper)}>
      <Sidebar
        handleClickMenu={handleClickMenu}
        collapsed={collapsedSideBar}
        handleClickCollapse={handleClickMenu}
        sidebarComponents={sidebarComponents}
      />
      <div className={c(styles.wrapper, collapsedSideBar && styles.collapsed)}>
        <header className={styles.header}>
          <Header handleClickMenu={handleClickMenu} collapsedSideBar={collapsedSideBar} />
        </header>
        <div className={c(styles.overlay, visibleMobileSideBar && styles.visibleOverlay)} />
        <main className={styles.main}>
          <MainContent />
          {children}
        </main>
      </div>
    </div>
  )
}
export default memo(PrivateLayout)
