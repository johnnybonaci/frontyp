import React from 'react';
import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import HistoryLeadsTable from 'features/HistoryLeads/components/HistoryLeadsTable/HistoryLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchHistoryLeadsList from 'features/HistoryLeads/hooks/useFetchHistoryLeadsList.tsx'
import styles from './historyLeadsList.module.scss'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type HistoryLeadsItem } from 'features/HistoryLeads/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import { Drawer, IconButton, Tooltip, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box } from '@mui/material';
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import { VisibilityOutlined } from '@mui/icons-material'

import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/HistoryLeads/transformers'
import RefreshButton from 'components/RefreshButton'

import HistoryLeadsFilters, {
  type HistoryLeadsListFiltersFormValues,
  DEFAULT_FILTERS,
} from '../components/HistoryLeadsFilters/HistoryLeadsFilters.tsx'

const HistoryLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'HistoryLeads' })
  const [selectedHistoryLeads, setSelectedHistoryLeads] = useState<HistoryLeadsItem | undefined>(
    undefined
  )
  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<HistoryLeadsListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )
  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const handleOpenHistoryLeadsDetails = useCallback(
    (HistoryLeadsItem: HistoryLeadsItem) => {
      setSelectedHistoryLeads(HistoryLeadsItem)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedHistoryLeads]
  )
  const { historyLeadsItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchHistoryLeadsList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const formatValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return value !== null && value !== undefined ? value.toString() : '-';
  };

  const initialColumns = useMemo(
    () => [

      {
        header: t('fields.phone'),
        fieldName: 'phone_id',
        sortable: true,
        dataModifier: (item: HistoryLeadsItem) => item.phone,
      },
      {
        header: t('fields.history'),
        fieldName: 'history',
        sortable: false,
        dataModifier: (item: HistoryLeadsItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenHistoryLeadsDetails(item)
            }}
          >
            <Tooltip title={t('details.title')}>
              <VisibilityOutlined sx={{ fontSize: 14 }} />
            </Tooltip>
          </IconButton>
        ),
      },
      {
        header: t('fields.lastUpdated'),
        fieldName: 'last_update',
        sortable: false,
        dataModifier: (item: HistoryLeadsItem) => item.last_update,
      }
    ],
    [t]
  )

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
  } = useTableSettings(initialColumns, [], 'historyLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <HistoryLeadsFilters
          onCancel={onCancel}
          onApply={onApply}
          isSearching={loading}
          initialFilters={filters}
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
      </div>
      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <HistoryLeadsTable
        columns={visibleColumns}
        rows={historyLeadsItems}
        loading={loading}
        onSort={setSorter}
        count={lastPage}
        page={page}
        sorter={sorter}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
      />
      <Drawer
        open={!collapsedViewDetails}
        onClose={toggleViewDetails}
        anchor="right"
        sx={{ width: '80%', '& .MuiDrawer-paper': { width: '80%' } }}
      >
        <DrawerHeader title="Historial de Cambios" onClose={toggleViewDetails} />
        <DrawerContent>
          <Box className={styles.detailsContainer}>
            <Box className={styles.item}>
              <Typography variant="subtitle1" className={styles.itemLabel}>
                Número de Teléfono:
              </Typography>
              <Typography variant="body1" className={styles.itemValue}>
                {selectedHistoryLeads?.phone || 'N/A'}
              </Typography>
            </Box>
            {selectedHistoryLeads?.data && selectedHistoryLeads.data.length > 0 ? (
              <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: 0, background: 'white', minWidth: 120, borderRight: '1px solid #ddd' }}>
                        Datos
                      </TableCell>
                      {selectedHistoryLeads.data.map((entry, index) => (
                        <TableCell key={index} colSpan={2} align="center" sx={{ fontWeight: 'bold', minWidth: 200, borderRight: '1px solid #ddd' }}>
                          {entry.after_h?.updated_at || 'Fecha no disponible'}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ position: 'sticky', left: 0, background: 'white', borderRight: '1px solid #ddd' }}></TableCell>
                      {selectedHistoryLeads.data.map((_, index) => (
                        <React.Fragment key={index}>
                          <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>Antes</TableCell>
                          <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>Después</TableCell>
                        </React.Fragment>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedHistoryLeads.data[0]?.before_h ? (
                      Object.keys(selectedHistoryLeads.data[0].before_h).map((key) => (
                        <TableRow key={key}>
                          <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: 0, background: 'white', minWidth: 120, borderRight: '1px solid #ddd' }}>
                            {key}
                          </TableCell>
                          {selectedHistoryLeads.data.map((entry, index) => (
                            <React.Fragment key={`${key}-${index}`}>
                              <TableCell
                                sx={{ color: entry.before_h[key] !== entry.after_h[key] ? 'red' : 'inherit', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}
                              >
                                <Tooltip title={formatValue(entry.before_h[key])} arrow>
                                  <span>{formatValue(entry.before_h[key])}</span>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{ color: entry.before_h[key] !== entry.after_h[key] ? 'green' : 'inherit', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}
                              >
                                <Tooltip title={formatValue(entry.after_h[key])} arrow>
                                  <span>{formatValue(entry.after_h[key])}</span>
                                </Tooltip>
                              </TableCell>
                            </React.Fragment>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: 'gray' }}>
                          No hay historial disponible para este número.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography align="center" color="gray">No hay historial disponible para este número.</Typography>
            )}
          </Box>
        </DrawerContent>
      </Drawer>

    </ContentBox>
  )
}

export default HistoryLeadsList
