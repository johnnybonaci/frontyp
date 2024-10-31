import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PubIdTable from 'features/Settings/components/PubIdTable/PubIdTable'
import useFilters from 'src/hooks/useFilters'
import useFetchPubIdList from 'features/Settings/hooks/useFetchPubIdList'
import PubIdFilters from '../components/PubIdFilters'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/Settings/transformers'

const PubIdList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'PubId' })

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
    <div>
      <PrivateScreenTitle title={t('PubId.title')} />
      <ContentBox>
        <PubIdFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
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
    </div>
  )
}

export default PubIdList
