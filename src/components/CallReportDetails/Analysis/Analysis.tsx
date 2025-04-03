import { type CallReportItem } from 'features/CallReport/types'
import './analysis.module.scss'

const Analysis = ({ callReportItem }: { callReportItem: CallReportItem }) => {
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html:
          callReportItem?.multiple?.data
            .replace(/\*\*([^*]+)\*\*/g, '<span class="subtitle">$1</span>')
            .replace(/^## (.+)$/gm, '<span class="title">$1</span>') ?? '',
      }}
    />
  )
}

export default Analysis
