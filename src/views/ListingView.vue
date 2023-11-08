<script setup>
import BackToOverview from '../components/BackToOverview.vue'
import uploadIcon from '../assets/icons/ic_upload@3x.png'
import clearWhiteIcon from '../assets/icons/ic_clear_white@3x.png'

import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { validationSchema } from '../validations/house'
import { apiService } from '../services/apiService'

const route = useRoute()
const router = useRouter()

const formValues = ref({})
const currentImageData = ref(null)
const newImageData = ref(null)
const newImageUrl = ref(null)

const isEditListing = ref('false')

// update isEditListing ref value whenever route name changes
watch(
  () => route.name,
  () => {
    route.name === 'houseEdit' ? (isEditListing.value = true) : (isEditListing.value = false)
  },
  { immediate: true }
)

// Set initial values if the user in edit listing
if (isEditListing.value === true) {
  apiService(`${import.meta.env.VITE_API_URL}/${route.params.id}`, 'GET')
    .then((response) => response.json())
    .then((data) => {
      currentImageData.value = data[0].image

      formValues.value = {
        streetName: data[0].location.street,
        houseNumber: data[0].location.houseNumber,
        numberAddition:
          data[0].location.houseNumberAddition === 'undefined'
            ? ''
            : data[0].location.houseNumberAddition,
        zip: data[0].location.zip,
        city: data[0].location.city,
        image: data[0].image,
        price: data[0].price,
        size: data[0].size,
        hasGarage: data[0].hasGarage,
        bedrooms: data[0].rooms.bedrooms,
        bathrooms: data[0].rooms.bathrooms,
        constructionYear: data[0].constructionYear,
        description: data[0].description
      }
    })
    .catch((error) => console.log('error', error))
}

function onSubmit(values) {
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

  if (isEditListing.value === false) {
    //fetch for create new listing

    apiService(import.meta.env.VITE_API_URL, 'POST', formData)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const formUploadData = new FormData()
          formUploadData.append('image', image, image.name)

          apiService(`${import.meta.env.VITE_API_URL}/${data.id}/upload`, 'POST', formUploadData)
            .then((response) => {
              if (response.ok) {
                setTimeout(() => {
                  router.push({ name: 'houseDetails', params: { id: data.id } })
                }, 1500)
              }
            })
            .catch((error) => console.log('Error occurred:', error))
        }
      })
      .catch((error) => console.log('Error occurred:', error))
  } else {
    //fetch for edit the house listing

    apiService(`${import.meta.env.VITE_API_URL}/${route.params.id}`, 'POST', formData)
      .then(() => {
        if (newImageData.value !== null) {
          const formUploadData = new FormData()
          formUploadData.append('image', image, image.name)

          apiService(
            `${import.meta.env.VITE_API_URL}/${route.params.id}/upload`,
            'POST',
            formUploadData
          ).catch((error) => console.log('Error occurred:', error))
        }
      })
      .then(() => {
        setTimeout(() => {
          router.push({ name: 'houseDetails', params: { id: route.params.id } })
        }, 1500)
      })
      .catch((error) => console.log('Error occurred:', error))
  }
}

function updateImageData(event) {
  if (event.target.files[0]) {
    newImageData.value = event.target.files[0]
    newImageUrl.value = URL.createObjectURL(newImageData.value)
  }
}

function clearUploadImage() {
  currentImageData.value = null
  newImageData.value = null
  newImageUrl.value = null
}
</script>

<template>
  <div class="container-new-listing-main">
    <div class="wrapper-new-listing">
      <div class="header-new-listing">
        <BackToOverview />
        <h1>{{ isEditListing === true ? 'Edit listing' : 'Create new listing' }}</h1>
      </div>

      <div class="container-form">
        <Form
          @submit="onSubmit"
          :validation-schema="validationSchema"
          :initial-values="isEditListing ? formValues : null"
          v-slot="{ meta, setFieldValue }"
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
            <Field id="image" name="image" type="file" v-slot="{ field }">
              <input
                id="image"
                style="display: none"
                name="image"
                type="file"
                accept=".png,.jpg"
                @change="updateImageData"
                ref="fileImageInput"
                v-bind="field"
              />

              <button
                v-if="isEditListing === true ? !currentImageData && !newImageData : !newImageData"
                type="button"
                @click="$refs.fileImageInput.click()"
                class="upload-button"
              >
                <img :src="uploadIcon" />
              </button>

              <div
                v-if="isEditListing === true ? currentImageData || newImageData : newImageData"
                class="container-uploaded-picture"
              >
                <img v-if="isEditListing === false" :src="newImageUrl" class="uploaded-picture" />
                <img
                  v-if="isEditListing === true"
                  :src="currentImageData && !newImageUrl ? currentImageData : newImageUrl"
                  class="uploaded-picture"
                />
                <img
                  :src="clearWhiteIcon"
                  class="clear-picture-icon"
                  @click="clearUploadImage(), setFieldValue('image', null)"
                />
              </div>
            </Field>
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
            <button
              v-if="isEditListing === false"
              type="submit"
              class="post-button"
              :class="!meta.valid ? 'post-button-disabled' : ''"
            >
              POST
            </button>
            <button
              v-if="isEditListing === true"
              type="submit"
              class="save-button"
              :class="!meta.dirty || !meta.valid ? 'save-button-disabled' : ''"
              :disabled="!meta.dirty || !meta.valid"
            >
              SAVE
            </button>
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
  font-size: 32px;
  font-weight: 700;
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

.post-button-disabled {
  opacity: 0.5;
}

.save-button {
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

.save-button-disabled {
  opacity: 0.5;
}

.upload-button {
  margin-top: 10px;
  width: 150px;
  height: 150px;
  background-color: transparent;
  border: 2px dashed var(--element-tertiary-2);
}

.upload-button img {
  width: 35px;
}

.container-uploaded-picture {
  margin-top: 20px;
  position: relative;
  display: flex;
  width: 150px;
}

.uploaded-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.clear-picture-icon {
  position: absolute;
  width: 40px;
  right: 0;
  top: 0;
  transform: translate(13px, -10px);
}

@media only screen and (max-width: 1400px) {
  .wrapper-new-listing {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .wrapper-new-listing {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .wrapper-new-listing {
    width: 500px;
  }
}

@media only screen and (max-width: 550px) {
  .wrapper-new-listing {
    width: 350px;
  }

  .container-form {
    width: 350px;
  }

  .double-input {
    width: 160px;
  }

  .container-input input {
    font-size: 12px;
  }
}

@media only screen and (max-width: 375px) {
  .container-new-listing-main {
    margin-bottom: 10vh;
    background-position: 15% 0%;
  }
  .wrapper-new-listing {
    width: 320px;
  }

  .wrapper-new-listing h1 {
    font-size: 18px;
  }

  .header-new-listing {
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 0;
    position: relative;
  }

  .container-form {
    width: 320px;
  }

  .double-input {
    width: 150px;
  }

  .container-input label {
    font-size: 12px;
  }

  .select-input {
    font-size: 12px;
  }

  .container-input span {
    font-size: 12px;
  }

  .input-description {
    font-size: 12px;
  }

  .post-button {
    width: 320px;
    font-size: 12px;
  }

  .save-button {
    width: 320px;
    font-size: 12px;
  }
}
</style>
