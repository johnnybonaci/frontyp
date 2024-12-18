import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import RoleFilters from '../components/RoleFilters/index.ts'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { transformFiltersToApi } from 'features/Roles/transformers'
import useFetchRoleList from 'features/Roles/hooks/useFetchRoleList.tsx'
import styles from './roleList.module.scss'
import RoleTable from 'features/Roles/components/RoleTable'
import { DEFAULT_FILTERS } from '../components/RoleFilters/RoleFilters.tsx'
import { RoleItem, RoleListFiltersFormValues } from '../types/index'
import RolesForm from '../components/RolesForm/index.ts'
import { IconButton, Tooltip } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const RoleList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Role' })

  const [selectedRole, setSelectedRole] = useState<RoleItem>()
  const [collapsedViewForm, setCollapsedViewForm] = useState(true)

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<RoleListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi
  )

  const { roleItems, sorter, setSorter, loading, paginator, refresh } = useFetchRoleList({
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
        header: t('fields.roleName'),
        fieldName: 'roleName',
        sortName: 'role_name',
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

  const handleOpenRoleEdition = useCallback(
    (role?: RoleItem) => {
      setSelectedRole(role)
      toggleViewForm()
    },
    [toggleViewForm, setSelectedRole]
  )

  const onFormSubmitSuccess = useCallback(() => {
    refresh()
    toggleViewForm()
  }, [refresh, toggleViewForm])

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <IconButton onClick={() => handleOpenRoleEdition()} color="primary" size="large">
          <Tooltip title={t('actions.create')}>
            <AddCircleOutlineIcon />
          </Tooltip>
        </IconButton>
        <RoleFilters
          onCancel={onCancel}
          onApply={onApply}
          isSearching={loading}
          initialFilters={filters}
        />
      </div>
      <RoleTable
        columns={initialColumns}
        rows={roleItems}
        loading={loading}
        onSort={setSorter}
        onClickEdit={handleOpenRoleEdition}
        count={paginator.lastPage}
        page={paginator.page}
        sorter={sorter}
        onPageChange={paginator.setPage}
        displayResultsMessage={paginator.displayResultsMessage}
        perPage={paginator.perPage}
        onRowsPerPageChange={paginator.setPerPage}
      />
      <RolesForm
        open={!collapsedViewForm}
        onClose={toggleViewForm}
        onEditSuccess={onFormSubmitSuccess}
        role={selectedRole}
      />
    </ContentBox>
  )
}

export default RoleList
