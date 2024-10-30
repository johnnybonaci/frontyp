import React from 'react'
import { useTranslation } from 'react-i18next'
import { type CPAReportItem } from 'features/CPAReport/types'
import styles from './cpaReportItemCard.module.scss'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface CPAReportItemCardProps {
  item: CPAReportItem
}

const CPAReportItemCard: React.FC<CPAReportItemCardProps> = ({ item }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CPAReport' })

  return (
    <div className={styles.card}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="content-header"
        >
          <h2 className={styles.title}>{item.buyerName}</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.content}>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.uniqueCalls')}</h3>
              <p className={styles.value}>{item.totalUnique}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.ucr')}</h3>
              <p className={styles.value}>{item.totalUcr}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.cpa')}</h3>
              <p className={styles.value}>{item.totalCpa}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.costPerCalls')}</h3>
              <p className={styles.value}>{item.totalRevenue}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.billable')}</h3>
              <p className={styles.value}>{item.totalBillables}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.sales')}</h3>
              <p className={styles.value}>{item.totalSales}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.state')}</h3>
              <p className={styles.value}>{item.state}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.label}>{t('fields.totalCost')}</h3>
              <p className={styles.value}>{item.totalCost}</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default CPAReportItemCard
