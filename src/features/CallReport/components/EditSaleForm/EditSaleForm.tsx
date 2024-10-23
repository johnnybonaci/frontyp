import { Button, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import useFetchEditSaleFormOptions from 'features/CallReport/hooks/useFetchEditSaleFormOptions.tsx'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import LoadingButton from '@mui/lab/LoadingButton'
import styles from './editSaleForm.module.scss'
import DrawerActions from 'components/DrawerActions'
import EditSaleFormSchema from 'features/CallReport/schema/EditSaleFormSchema.ts'

export interface EditSaleFormValues {
  sale: string
  insurance: string
  insuranceName: string
}

interface EditSaleFormFiltersProps {
  onCancel: () => void
  onSubmit: (data: any) => void
  loading?: boolean
  initialValues?: EditSaleFormValues
}

const DEFAULT_VALUES = {
  sale: '',
  insurance: '',
  insuranceName: '',
}

const EditSaleForm: FC<EditSaleFormFiltersProps> = ({
  onCancel,
  onSubmit,
  loading = false,
  initialValues = DEFAULT_VALUES,
}) => {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'CallReport.editSaleForm' })
  const { saleOptions, insuranceOptions } = useFetchEditSaleFormOptions()

  const { handleChange, values, setValues, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: EditSaleFormSchema,
    onSubmit: (data) => {
      onSubmit(data)
    },
  })

  const getFieldProps = useCallback(
    (name: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const error = errors[name]
      return {
        name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        value: values[name],
        onChange: handleChange,
        error: !!error,
        helperText: error ? i18n.t(error) : '',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onClear: async () => await setFieldValue(name, DEFAULT_VALUES[name]),
      }
    },
    [handleChange, values, initialValues, setFieldValue, errors]
  )

  useEffect(() => {
    void setValues(initialValues)
  }, [initialValues, setValues])

  console.log(errors)

  return (
    <form onSubmit={handleSubmit}>
      <DrawerHeader title={t('title')} onClose={onCancel} />
      <DrawerContent>
        <div className={styles.form}>
          <Select
            label={t('sale')}
            options={entitiesToOptions(saleOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('sale')}
          />
          <Select
            label={t('insurance')}
            options={entitiesToOptions(insuranceOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('insurance')}
          />
          <TextField label={t('insuranceName')} fullWidth {...getFieldProps('insuranceName')} />
        </div>
        <DrawerActions
          actions={
            <>
              <Button variant="outlined" onClick={onCancel} title={t('cancel')}>
                {t('cancel')}
              </Button>
              <LoadingButton type="submit" loading={loading} title={t('submit')}>
                {t('submit')}
              </LoadingButton>
            </>
          }
        />
      </DrawerContent>
    </form>
  )
}

export default EditSaleForm
