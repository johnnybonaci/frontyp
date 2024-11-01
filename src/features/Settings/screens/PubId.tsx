import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PubIdTable from 'features/Settings/components/PubIdTable/PubIdTable'
import useFilters from 'src/hooks/useFilters'
import useFetchPubIdList from 'features/Settings/hooks/useFetchPubIdList'
import PubIdFilters from '../components/PubIdFilters'
import ContentBox from 'components/ContentBox'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/Settings/transformers'
import { Stack } from '@mui/material'

const PubIdList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })

  const { filters, onCancel, onApply } = useFilters(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { pubIdItems, sorter, setSorter, paginator, loading } = useFetchPubIdList({ filters })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const columns = useMemo(
    () => [
      {
        header: t('fields.pubs'),
        fieldName: 'id',
        sortable: true,
      },
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      // {
      //   header: t('fields.aca'),
      //   fieldName: 'aca',
      //   sortable: true,
      // },
      // {
      //   header: t('fields.mc'),
      //   fieldName: 'mc',
      //   sortable: true,
      // },
    ],
    [t]
  )

  return (
    <ContentBox>
      <Stack pt={2}>
        <PubIdFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <PubIdTable
        columns={columns}
        rows={pubIdItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickView={console.log}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
    </ContentBox>
  )
}

export default PubIdList
