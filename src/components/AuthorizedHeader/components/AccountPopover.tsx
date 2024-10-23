import { useCallback, type FC } from 'react'
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { useTranslation } from 'react-i18next'

interface AccountPopoverProps {
  anchorEl: Element | null
  onClose?: () => void
  open: boolean
}

const AccountPopover: FC<AccountPopoverProps> = ({ anchorEl, onClose, open }) => {
  const { session } = useAuth()
  const { user } = session ?? {}
  const auth = useAuth()
  const { t } = useTranslation('accountPopover')

  const handleSignOut = useCallback(() => {
    onClose?.()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    void auth.logout()
  }, [onClose, auth])

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{t('account')}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>{t('signOut')}</MenuItem>
      </MenuList>
    </Popover>
  )
}

export default AccountPopover
