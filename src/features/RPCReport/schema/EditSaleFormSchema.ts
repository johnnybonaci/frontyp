import * as Yup from 'yup'

const EditSaleFormSchema = Yup.object({
  sale: Yup.string().required('validations:required'),
  insurance: Yup.string().required('validations:required'),
})

export default EditSaleFormSchema
