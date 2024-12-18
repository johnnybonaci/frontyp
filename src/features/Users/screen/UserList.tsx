import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import UserFilters from '../components/UserFilters/index.ts'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { transformFiltersToApi } from 'features/Users/transformers'
import useFetchUserList from 'features/Users/hooks/useFetchUserList.tsx'
import styles from './userList.module.scss'
import UserTable from 'features/Users/components/UserTable'
import { DEFAULT_FILTERS } from '../components/UserFilters/UserFilters.tsx'
import { UserItem, UserListFiltersFormValues } from '../types/index'
import UsersForm from '../components/UsersForm/index.ts'
import { IconButton, Tooltip } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const UserList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'User' })

  const [selectedUser, setSelectedUser] = useState<UserItem>()
  const [collapsedViewForm, setCollapsedViewForm] = useState(true)

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<UserListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi
  )

  const { userItems, sorter, setSorter, loading, paginator, refresh } = useFetchUserList({
    filters: filtersToAPI,
  })

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.id'),
        fieldName: 'id',
        sortName: 'id',
        sortable: true,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortName: 'email',
        sortable: true,
      },
      {
        header: t('fields.userName'),
        fieldName: 'userName',
        sortName: 'user_name',
        sortable: true,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortName: 'type',
        sortable: true,
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pubId',
        sortName: 'pub_id',
        sortable: true,
      },
      {
        header: t('fields.vendors'),
        fieldName: 'vendors',
        sortName: 'vendors',
        sortable: true,
      },
      {
        header: t('fields.roleName'),
        fieldName: 'roleName',
        sortName: 'role_name',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewForm = useCallback(() => {
    setCollapsedViewForm(!collapsedViewForm)
  }, [setCollapsedViewForm, collapsedViewForm])

  const handleOpenUserEdition = useCallback(
    (user?: UserItem) => {
      setSelectedUser(user)
      toggleViewForm()
    },
    [toggleViewForm, setSelectedUser]
  )

  const onFormSubmitSuccess = useCallback(() => {
    refresh()
    toggleViewForm()
  }, [refresh, toggleViewForm])

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <IconButton onClick={() => handleOpenUserEdition()} color="primary" size="large">
          <Tooltip title={t('actions.create')}>
            <AddCircleOutlineIcon />
          </Tooltip>
        </IconButton>
        <UserFilters
          onCancel={onCancel}
          onApply={onApply}
          isSearching={loading}
          initialFilters={filters}
        />
      </div>
      <UserTable
        columns={initialColumns}
        rows={userItems}
        loading={loading}
        onSort={setSorter}
        onClickEdit={handleOpenUserEdition}
        count={paginator.lastPage}
        page={paginator.page}
        sorter={sorter}
        onPageChange={paginator.setPage}
        displayResultsMessage={paginator.displayResultsMessage}
        perPage={paginator.perPage}
        onRowsPerPageChange={paginator.setPerPage}
      />
      <UsersForm
        open={!collapsedViewForm}
        onClose={toggleViewForm}
        onEditSuccess={onFormSubmitSuccess}
        user={selectedUser}
      />
    </ContentBox>
  )
}

export default UserList
