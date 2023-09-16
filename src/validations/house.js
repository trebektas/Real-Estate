import * as Yup from 'yup'

export const validationSchema = Yup.object({
  streetName: Yup.string().required('Required field missing.').trim(),
  houseNumber: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  numberAddition: Yup.string().trim(),
  zip: Yup.string().required('Required field missing.').trim(),
  city: Yup.string().required('Required field missing.').trim(),
  image: Yup.mixed()
    .required('Required field missing.')
    .test('is-valid-size', 'Max allowed size is 7MB', (value) => {
      if (typeof value === 'object') {
        return value && value.size <= Number(import.meta.env.VITE_MAX_FILE_SIZE)
      } else return true
    }),
  price: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  size: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  hasGarage: Yup.boolean().required('Required field missing.'),
  bedrooms: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  bathrooms: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  constructionYear: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number')
    .test('len', 'Must be exactly 4 characters', (val) => val.toString().length === 4)
    .min(1901, 'Must be greater than or equal to 1901')
    .max(2023, 'Must be less than or equal to 2023'),
  description: Yup.string().required('Required field missing.')
})
