import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AutorenewOutlined, EditNoteOutlined, RecordVoiceOverOutlined, VisibilityOutlined } from "@mui/icons-material";
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type CallReportItem } from 'features/CallReport/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface CallReportTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (callReportItem: CallReportItem) => void
  onClickEditNote: (callReportItem: CallReportItem) => void
  onClickTranscript: (callReportItem: CallReportItem) => void
  onClickRegenerate: (callReportItem: CallReportItem) => void
}

const CallReportTable: FC<CallReportTableProps> = ({
  onClickView,
  onClickEditNote,
  onClickRegenerate,
  onClickTranscript,
  ...restOfProps
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.actions' })

  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      orValidation: true,
      visible: (callReportItem: CallReportItem) => callReportItem.statusT.isProcessed,
    },
    {
      label: t('changeStatus'),
      icon: EditNoteOutlined,
      onClick: onClickEditNote,
      orValidation: true,
      visible: (callReportItem: CallReportItem) => callReportItem.statusT.isProcessed,
    },
    {
      label: t('regenerate'),
      icon: AutorenewOutlined,
      onClick: onClickRegenerate,
      orValidation: true,
      visible: (callReportItem: CallReportItem) => callReportItem.statusT.isProcessed,
    },
    {
      label: t('transcript'),
      icon: RecordVoiceOverOutlined,
      onClick: onClickTranscript,
      orValidation: true,
      visible: (callReportItem: CallReportItem) =>
        callReportItem.statusT.isFailed || callReportItem.statusT.isAvailableToDownload,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default CallReportTable
