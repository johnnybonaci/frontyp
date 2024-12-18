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
import dateFormat from 'utils/dateFormat.ts'

const RoleList: FC = () => {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Role' })

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
        header: t('fields.name'),
        fieldName: 'name',
        sortName: 'name',
        sortable: true,
      },
      {
        header: t('fields.permissions'),
        fieldName: 'permissionList',
        sortable: false,
        dataModifier: (roleItem: RoleItem) => i18n.t('_toList', { val: roleItem.permissions }),
      },
      {
        header: t('fields.createdAt'),
        fieldName: 'createdAt',
        sortName: 'created_at',
        sortable: true,
        dataModifier: (roleItem: RoleItem) => dateFormat(roleItem.createdAt),
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
