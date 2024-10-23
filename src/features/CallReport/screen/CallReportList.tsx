import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import CallReportTable from 'features/CallReport/components/CallReportTable/CallReportTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchCallReportList from 'features/CallReport/hooks/useFetchCallReportList.tsx'
import CallReportFilters from '../components/CallReportFilters'
import styles from './callReportList.module.scss'
import { formatIndicator, formatMoneyIndicator } from 'hooks/indicator.ts'
import Indicator from 'components/GrowthIndicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type CallReportItem } from 'features/CallReport/types'
import CallReportDetails from 'components/CallReportDetails'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Button, Drawer, Typography } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/CallReport/transformers'
import EditSaleForm from 'features/CallReport/components/EditSaleForm'
import ExportButton from 'components/ExportButton'
import DrawerActions from 'components/DrawerActions'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import { useEditInsurance } from 'features/CallReport/hooks/useEditInsurance.tsx'
import { type EditSaleFormValues } from 'features/CallReport/components/EditSaleForm/EditSaleForm.tsx'
import { useRegenerate } from 'features/CallReport/hooks/useRegenerate.tsx'

const CallReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport' })
  const [selectedCallReport, setSelectedCallReport] = useState<CallReportItem | undefined>(
    undefined
  )
  const { editInsurance } = useEditInsurance()
  const { regenerate } = useRegenerate()

  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)
  const [openRegenerateConfirmation, setOpenRegenerateConfirmation] = useState(false)
  const [collapsedEditSale, setCollapsedEditSale] = useState(true)

  const toggleEditSale = useCallback(() => {
    setCollapsedEditSale(!collapsedEditSale)
  }, [setCollapsedEditSale, collapsedEditSale])

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const { onCancel, onApply, filters, initialFilters } = useFilters(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )
  const allFilters = useMemo(() => {
    return {
      ...filters,
    }
  }, [filters])
  const {
    callReportItems,
    callReportAverages,
    callReportPercentages,
    sorter,
    setSorter,
    paginator,
    loading,
  } = useFetchCallReportList({
    filters: allFilters,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({ url: `${config.api.baseUrl}/export/calls`, filters: allFilters })

  const handleOpenCallReportDetails = useCallback(
    (callReport: CallReportItem) => {
      setSelectedCallReport(callReport)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedCallReport]
  )

  const handleEdit = useCallback(
    (callReport: CallReportItem) => {
      setSelectedCallReport(callReport)
      toggleEditSale()
    },
    [toggleEditSale, setSelectedCallReport]
  )

  const handleEditInsurance = useCallback(
    (data: EditSaleFormValues) => {
      if (selectedCallReport?.id) {
        void editInsurance(selectedCallReport?.id, data).then(() => {
          setCollapsedEditSale(true)
        })
      }
    },
    [selectedCallReport, setCollapsedEditSale]
  )

  const handleRegenerate = (callReport: CallReportItem): void => {
    setSelectedCallReport(callReport)
    setOpenRegenerateConfirmation(true)
  }

  const onRegenerate = (): void => {
    if (selectedCallReport?.id) {
      void regenerate(selectedCallReport?.id).then(() => {
        setOpenRegenerateConfirmation(false)
      })
    }
  }

  const initialColumns = useMemo(
    () => [
      { header: t('fields.phone'), fieldName: 'phoneId', sortable: true },
      { header: t('fields.pubId'), fieldName: 'pubListId', sortable: true },
      { header: t('fields.offers'), fieldName: 'offers', sortable: true },
      { header: t('fields.vendorsTd'), fieldName: 'vendorsTd', sortable: true },
      { header: t('fields.state'), fieldName: 'state', sortable: true },
      { header: t('fields.buyers'), fieldName: 'buyers', sortable: true },
      { header: t('fields.status'), fieldName: 'status', sortable: true },
      { header: t('fields.cpl'), fieldName: 'cpl', sortable: true },
      { header: t('fields.durations'), fieldName: 'durations', sortable: true },
      { header: t('fields.insurance'), fieldName: 'insurance', sortable: true },
      {
        header: t('fields.insuranceName'),
        fieldName: 'insuranceName',
        sortable: true,
      },
      {
        header: t('fields.terminatingPhone'),
        fieldName: 'terminatingPhone',
        sortable: true,
      },
      { header: t('fields.didNumberId'), fieldName: 'didNumberId', sortable: true },
    ],
    [t]
  )

  const initialIndicators = [
    {
      name: 'Total Spend',
      fieldName: 'totalSpend',
      value: formatMoneyIndicator(callReportAverages?.totalSpend),
      growthPercentage: callReportPercentages?.totalSpend,
    },
    {
      name: 'Total Revenue',
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(callReportAverages?.totalRevenue),
      growthPercentage: callReportPercentages?.totalRevenue,
    },
    {
      name: 'Total Gross Fit',
      fieldName: 'totalProfit',
      value: formatMoneyIndicator(callReportAverages?.totalProfit),
      growthPercentage: callReportPercentages?.totalProfit,
    },
    {
      name: 'Total Calls',
      fieldName: 'totalCalls',
      value: formatIndicator(callReportAverages?.totalCalls),
      growthPercentage: callReportPercentages?.totalCalls,
    },
    {
      name: 'Total Billable',
      fieldName: 'totalBillable',
      value: formatIndicator(callReportAverages?.totalBillable),
      growthPercentage: callReportPercentages?.totalBillable,
    },
  ]

  const {
    columns,
    indicators,
    notVisibleColumns,
    notVisibleIndicators,
    reorderColumns,
    visibleIndicators,
    resetToDefaultSettings,
    visibleColumns,
    reorderIndicators,
    toggleColumnVisibility,
    toggleIndicatorVisibility,
  } = useTableSettings(initialColumns, initialIndicators, 'callReportList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <CallReportFilters
          onCancel={onCancel}
          onApply={onApply}
          isSearching={loading}
          initialFilters={initialFilters}
        />
        <ListSettings
          columns={columns}
          unselectedColumns={notVisibleColumns}
          onReorderColumns={reorderColumns}
          onToggleColumn={toggleColumnVisibility}
          indicators={indicators}
          resetToDefaultSettings={resetToDefaultSettings}
          unselectedIndicators={notVisibleIndicators}
          onReorderIndicators={reorderIndicators}
          onToggleIndicator={toggleIndicatorVisibility}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <ExportButton onExport={doFetch} />
      </div>

      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <CallReportTable
        columns={visibleColumns}
        rows={callReportItems}
        loading={loading}
        onClickView={handleOpenCallReportDetails}
        onSort={setSorter}
        count={lastPage}
        page={page}
        sorter={sorter}
        onPageChange={setPage}
        onClickEditNote={handleEdit}
        onClickRegenerate={handleRegenerate}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
      />
      <Drawer open={!collapsedViewDetails} onClose={toggleViewDetails} anchor="right">
        <DrawerHeader title={t('details.title')} onClose={toggleViewDetails} />
        <DrawerContent>
          <CallReportDetails callReportItem={selectedCallReport} />
        </DrawerContent>
      </Drawer>
      <Drawer open={!collapsedEditSale} onClose={toggleEditSale} anchor="right">
        <EditSaleForm
          onCancel={toggleEditSale}
          // initialValues={{
          //   insurance: selectedCallReport?.insurance ?? '',
          //   insuranceName: selectedCallReport?.insuranceName ?? '',
          //   sale: selectedCallReport?.dateSale,
          // }}
          onSubmit={handleEditInsurance}
        />
      </Drawer>

      <Drawer
        open={openRegenerateConfirmation}
        onClose={() => {
          setOpenRegenerateConfirmation(false)
        }}
        anchor="right"
      >
        <DrawerHeader
          title={t('regenerate.confirmation.title')}
          onClose={() => {
            setOpenRegenerateConfirmation(false)
          }}
        />
        <DrawerContent>
          <div className={styles.drawerContent}>
            <Typography variant="body1">{t('regenerate.confirmation.message')}</Typography>
            <DrawerActions
              actions={
                <>
                  <Button
                    onClick={() => {
                      setOpenRegenerateConfirmation(false)
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    {t('regenerate.confirmation.cancel')}
                  </Button>
                  <Button onClick={onRegenerate} variant="contained" color="primary">
                    {t('regenerate.confirmation.button')}
                  </Button>
                </>
              }
            />
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default CallReportList
