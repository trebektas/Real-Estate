<script setup>
import BackToOverview from '../components/BackToOverview.vue'
// import uploadIcon from '../assets/icons/ic_upload@3x.png'
// import clearWhiteIcon from '../assets/icons/ic_clear_white@3x.png'

import { Field, Form, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import { useRouter } from 'vue-router'

const MAX_FILE_SIZE = 7340032
const router = useRouter()

const validationSchema = Yup.object({
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
    .test(
      'is-valid-size',
      'Max allowed size is 7MB',
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
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

function onSubmit(values) {
  //delete THIS!!!!!!!!!
  console.log('submitted')

  const formData = new FormData()
  const {
    price,
    bedrooms,
    bathrooms,
    size,
    streetName,
    houseNumber,
    numberAddition,
    zip,
    city,
    constructionYear,
    hasGarage,
    description,
    image
  } = values

  formData.append('price', price)
  formData.append('bedrooms', bedrooms)
  formData.append('bathrooms', bathrooms)
  formData.append('size', size)
  formData.append('streetName', streetName)
  formData.append('houseNumber', houseNumber)
  formData.append('numberAddition', numberAddition)
  formData.append('zip', zip)
  formData.append('city', city)
  formData.append('constructionYear', constructionYear)
  formData.append('hasGarage', hasGarage)
  formData.append('description', description)

  const postConfig = {
    method: 'POST',
    headers: {
      'X-Api-Key': 'xD7bh1ZoA3mRlwrv8dYaNgXGLuKe_4JP'
    },
    body: formData
  }

  fetch(`https://api.intern.d-tt.nl/api/houses`, postConfig)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const formUploadData = new FormData()
        formUploadData.append('image', image)

        const uploadImageConfig = {
          method: 'POST',
          headers: {
            'X-Api-Key': 'xD7bh1ZoA3mRlwrv8dYaNgXGLuKe_4JP'
          },
          body: formUploadData
        }

        //delete THIS!!!!!!!!!
        console.log('posted house data')
        console.log(data)
        fetch(`https://api.intern.d-tt.nl/api/houses/${data.id}/upload`, uploadImageConfig)
          .then((response) => {
            //delete THIS!!!!!!!!!
            console.log('uploaded picture')
            console.log(response)
            if (response.ok) {
              router.push({ name: 'houseId', params: { id: data.id } })
            }
          })
          .catch((error) => console.log('Error occurred:', error))
      }
    })
    .catch((error) => console.log('Error occurred:', error))
}

function invalidSubmit() {
  console.log('invalidSubmit')
}
</script>

<template>
  <div class="container-new-listing-main">
    <div class="wrapper-new-listing">
      <BackToOverview />
      <h1>Create new listing</h1>
      <div class="container-form">
        <Form
          @submit="onSubmit"
          @invalid-submit="invalidSubmit"
          :validation-schema="validationSchema"
        >
          <!--STREET NAME INPUT-->
          <div class="container-input">
            <label for="streetName">Street Name*</label>
            <Field
              id="streetName"
              type="text"
              name="streetName"
              placeholder="Enter the street name"
            />
            <ErrorMessage name="streetName" class="error-message" />
          </div>

          <!--HOUSE NUMBER && ADDITION INPUTS-->
          <div class="container-input container-double-input">
            <div class="double-input">
              <label for="houseNumber">House Number*</label>
              <Field
                id="houseNumber"
                type="number"
                name="houseNumber"
                placeholder="Enter house number"
              />
              <ErrorMessage name="houseNumber" />
            </div>
            <div class="double-input">
              <label for="numberAddition">Addition (optional)</label>
              <Field id="numberAddition" type="text" name="numberAddition" placeholder="e.g. A" />
              <ErrorMessage name="numberAddition" />
            </div>
          </div>

          <!--POSTAL CODE INPUT-->
          <div class="container-input">
            <label for="zip">Postal Code*</label>
            <Field id="zip" type="text" name="zip" placeholder="e.g. 1000 AA" />
            <ErrorMessage name="zip" />
          </div>

          <!--CITY INPUT-->
          <div class="container-input">
            <label for="city">City*</label>
            <Field id="city" type="text" name="city" placeholder="e.g. Utrecht" />
            <ErrorMessage name="city" />
          </div>

          <!--UPLOAD PICTURE INPUT-->
          <div class="container-input">
            <label for="image">Upload picture (PNG or JPG)*</label>
            <Field id="image" type="file" name="image" accept=".png,.jpg" />
            <ErrorMessage name="image" class="upload-error-message" />
          </div>

          <!--PRICE INPUT-->
          <div class="container-input">
            <label for="price">Price*</label>
            <Field id="price" type="number" name="price" placeholder="e.g. €150.000" />
            <ErrorMessage name="price" />
          </div>

          <!--SIZE && GARAGE INPUTS-->
          <div class="container-input container-double-input">
            <div class="double-input">
              <label for="size">Size*</label>
              <Field id="size" type="number" name="size" placeholder="e.g. 60m2" />
              <ErrorMessage name="size" />
            </div>
            <div class="double-input">
              <label for="hasGarage">Garage*</label>
              <Field
                id="hasGarage"
                as="select"
                name="hasGarage"
                placeholder="e.g. A"
                class="select-input"
                required
              >
                <option value="" selected disabled hidden class="default-select-option">
                  Select
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option></Field
              >
              <ErrorMessage name="hasGarage" />
            </div>
          </div>

          <!--BEDROOMS && BATHROOMS INPUTS-->
          <div class="container-input container-double-input">
            <div class="double-input">
              <label for="bedrooms">Bedrooms*</label>
              <Field id="bedrooms" type="number" name="bedrooms" placeholder="Enter amount" />
              <ErrorMessage name="bedrooms" />
            </div>
            <div class="double-input">
              <label for="bathrooms">Bathrooms*</label>
              <Field id="bathrooms" type="text" name="bathrooms" placeholder="Enter amount" />
              <ErrorMessage name="bathrooms" />
            </div>
          </div>

          <!--CONSTRUCTION DATE INPUT-->
          <div class="container-input">
            <label for="constructionYear">Construction date*</label>
            <Field
              id="constructionYear"
              type="number"
              name="constructionYear"
              placeholder="e.g. 1990"
            />
            <ErrorMessage name="constructionYear" />
          </div>

          <!--DESCRIPTION INPUT-->
          <div class="container-input">
            <label for="description">Description*</label>
            <Field
              id="description"
              as="textarea"
              name="description"
              placeholder="Enter description"
              class="input-description"
            />
            <ErrorMessage name="description" />
          </div>

          <div class="container-button">
            <button type="submit" class="post-button">POST</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style>
.container-new-listing-main {
  background-image: url(../assets/images/img_background@3x.png);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper-new-listing {
  width: 1320px;
  margin: 0 auto;
}

.wrapper-new-listing h1 {
  font-family: 'Montserrat', sans-serif;
}

.container-form {
  width: 400px;
}

/*Remove input background color for autocomplete */
.container-form input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.container-input {
  display: flex;
  flex-direction: column;
}

.container-double-input {
  flex-direction: row;
  justify-content: space-between;
}

.double-input {
  width: 190px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

select,
select option {
  color: black;
}

select:invalid,
select option[value=''] {
  color: var(--element-tertiary-2);
}

.container-input label {
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.container-input input {
  padding: 15px 20px;
  margin-top: 8px;
  border: none;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.container-input input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--element-tertiary-2);
  opacity: 1; /* Firefox */
}

.container-input input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--element-tertiary-2);
}

.container-input input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--element-tertiary-2);
}

.container-input textarea::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--element-tertiary-2);
  opacity: 1; /* Firefox */
}

.container-input textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--element-tertiary-2);
}

.container-input textarea::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--element-tertiary-2);
}

.container-input input::-webkit-outer-spin-button,
.container-input input::-webkit-inner-spin-button {
  /* Chrome, Safari, Edge, Opera */
  -webkit-appearance: none;
  margin: 0;
}

.container-input input[type='number'] {
  /* Firefox */
  -moz-appearance: textfield;
  appearance: textfield;
}

.container-uploaded-image {
  position: relative;
  margin-top: 20px;
}

.uploaded-image {
  width: 200px;
  border-radius: 8px;
}

.upload-picture {
  width: 120px;
  height: 120px;
  border: 2px var(--element-tertiary-2) dashed;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
}

.upload-picture img {
  width: 30px;
}

.select-input {
  padding: 15px 20px;
  margin-top: 8px;
  border: none;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.container-input span {
  color: var(--element-primary);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  margin-top: 7px;
}

.input-description {
  height: 150px;
  resize: none;
  padding: 15px 20px;
  margin-top: 8px;
  border: none;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.container-button {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 30px;
}

.post-button {
  width: 200px;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background-color: var(--element-primary);
  color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}
</style>
