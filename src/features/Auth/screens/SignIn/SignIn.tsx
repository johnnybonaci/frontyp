import { type FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import { Link, TextField } from '@mui/material'
import GenericError from 'components/GenericError'
import useAuth from 'src/features/Auth/hooks/useAuth'
import PasswordTextField from 'components/PasswordTextField'
import { PATHS } from 'src/features/Auth/routes.tsx'
import SignInFormSchema from 'src/features/Auth/schema/SignInFormSchema'
import styles from './signIn.module.scss'
import headerLogo from 'src/assets/logo.svg'
import c from 'classnames'

interface FormValues {
  email: string
  password: string
  submit: null | string
}

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const auth = useAuth()
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: SignInFormSchema(),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true)
        await auth.login(values.email, values.password)
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <img className={styles.marginI} src={headerLogo} alt="header logo" />
        <form noValidate className={styles.formContent} onSubmit={formik.handleSubmit}>
          <TextField
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label={t('fields.email.label')}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            disabled={isLoading}
            autoFocus
          />
          <PasswordTextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label={t('fields.password.label')}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={isLoading}
          />
          <div className={c(styles.forgotPassword)}>
            <Link className={styles.link} component={NavLink} to={`/auth/${PATHS.FORGOT_PASSWORD}`}>
              {t('buttons.forgotPassword')}
            </Link>
          </div>
          <GenericError error={formik.errors.submit} />
          <LoadingButton
            className={styles.actions}
            fullWidth
            size="large"
            type="submit"
            loading={isLoading}
          >
            {t('buttons.login')}
          </LoadingButton>
        </form>

      </div>

    </div>

  )
}

export default Page