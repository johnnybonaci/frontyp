import { type FC } from 'react'
import headerDesktop from 'src/assets/headerBackgroundDesktop.png'
import headerMobile from 'src/assets/headerBackgroundMobile.png'
import financial from 'src/assets/financial.png'
import c from 'classnames'
import { Outlet } from 'react-router-dom'
import styles from './publicLayout.module.scss'
import { useTranslation } from 'react-i18next'

const PublicLayout: FC = () => {
  const { t } = useTranslation('authLayout')

  return (
    <div className={c(styles.relative, styles.md_flex, styles.md_flex_col, styles.xl_h_screen, styles.xl_max_h_1440px)} >
      <img
        className={c(styles.absolute, styles.left_0, styles.top_0, styles.z_n1, styles.h_360px, styles.w_screen, styles.md_h_480px, styles.xl_hidden)}
        src={headerMobile}
      />
      <img
        className={c(styles.absolute, styles.left_0, styles.top_0, styles.z_n1, styles.hidden, styles.h_screen, styles.max_h_1440px, styles.w_800px, styles.xl_block)}
        src={headerDesktop}
      />

      <div className={c(styles.relative, styles.justify_between, styles.md_mt_140px, styles.xl_flex, styles.xl_flex_row, styles.xl_items_center)}>
        <div>
          <section className={c(styles.mx_auto, styles.w_310px, styles.px_5, styles.text_center, styles.md_w_400px, styles.xl_mx_0, styles.xl_mb_48, styles.xl_ml_20, styles.xl_w_590px, styles.xl_px_0, styles.sm_m_0_auto)}>
            <p className={c(styles.title, styles.pt_10, styles.xl_pt_0)}>
              {t('projectTitle')}
            </p>
            <p className={c(styles.subtitle, styles.pt_7, styles.xl_mr_12, styles.xl_pt_60)}>
              <span> {t('projectSubTitle1')} </span>
              <span> {t('projectSubTitle2')} </span>
            </p>
          </section>
        </div>

        <img
          className={c(styles.absolute, styles.bottom_n10, styles.left_20_percent, styles.hidden, styles.xl_block)}
          src={financial}
        />
        <section className={c(styles.mx_auto, styles.pt_36, styles.xl_pt_0, styles.w_400)}>
          <Outlet />
          <footer className={styles.footer}>
            <p>
              <span className={styles.textSpan}> By signing up, you agree to our </span>
              <a className={styles.link} href="https://yieldpro.io/privacy">
                Terms and Conditions
              </a>
              &amp;
              <a className={styles.link} href="https://yieldpro.io/privacy">
                Privacy Policy
              </a>
            </p>
          </footer>
        </section>

      </div>

    </div >
  )
}

export default PublicLayout
