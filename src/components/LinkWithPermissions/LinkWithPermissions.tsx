import { type FC } from 'react'
import { type LinkWithPermissionsProps } from './types'
import { Link } from 'react-router-dom'
import useAuth from 'features/Auth/hooks/useAuth.ts'
import styles from './linkWithPermissions.module.scss'

const LinkWithPermissions: FC<LinkWithPermissionsProps> = ({
  children,
  to,
  permissions = 'yes',
  target = undefined,
}) => {
  const { checkPermissions } = useAuth()

  if (checkPermissions(permissions)) {
    return (
      <Link className={styles.link} to={to} target={target}>
        {children}
      </Link>
    )
  }

  return children
}

export default LinkWithPermissions
