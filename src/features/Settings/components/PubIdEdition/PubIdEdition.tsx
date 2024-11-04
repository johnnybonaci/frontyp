import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, IconButton, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { PubIdItem } from 'features/Settings/types'
import { AddCircleOutlineOutlined, DeleteOutlined } from '@mui/icons-material'
import { generateUniqueId } from 'utils/utils'

interface PubIdEditionProps {
  open: boolean
  onClose: () => void
  pubId?: PubIdItem
}

const EMPTY_PUB_USER = { name: '', cpl: 0 }

function PubIdEdition({ open, onClose }: PubIdEditionProps): React.ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })

  const [name, setName] = useState('KPRO')
  const [users, setUsers] = useState([{ id: generateUniqueId(), ...EMPTY_PUB_USER }])

  const handleAddUser = () => {
    setUsers([...users, { id: generateUniqueId(), ...EMPTY_PUB_USER }])
  }

  const handleUserChange = (index: number, value: string) => {
    const newUsers = [...users]
    newUsers[index].name = value
    setUsers(newUsers)
  }

  const handleCplChange = (index: number, value: number) => {
    const newUsers = [...users]
    newUsers[index].cpl = value
    setUsers(newUsers)
  }

  const handleDeleteUser = (index: number) => {
    const newUsers = [...users]
    newUsers.splice(index, 1)
    setUsers(newUsers)
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right" sx={{ position: 'relative' }}>
      <DrawerHeader title={t('edition.title')} onClose={onClose} />
      <DrawerContent>
        <Stack direction="row" alignItems="end" mb={2}>
          <TextField
            label={t('fields.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            startIcon={<AddCircleOutlineOutlined />}
            variant="contained"
            color="primary"
            onClick={handleAddUser}
          >
            {t('addCpl')}
          </Button>
        </Stack>

        <Stack flex={1} spacing={2} mb={2}>
          {users.map((user, index) => (
            <Stack key={user.id} direction="row" alignItems="center" spacing={2}>
              <TextField
                label={t('fields.user')}
                value={user.name}
                onChange={(e) => handleUserChange(index, e.target.value)}
              />
              <TextField
                label={t('fields.cpl')}
                type="number"
                value={user.cpl}
                onChange={(e) => handleCplChange(index, Number(e.target.value))}
              />
              <IconButton
                color="error"
                onClick={() => handleDeleteUser(index)}
                aria-label="delete"
                sx={{ mb: 2, alignSelf: 'end' }}
              >
                <DeleteOutlined sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          height={48}
          py={2}
          position="sticky"
          bottom={32}
          bgcolor="white"
        >
          <Button variant="contained" color="primary" fullWidth>
            {t('save')}
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose} fullWidth>
            {t('cancel')}
          </Button>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}

export default PubIdEdition
