<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const customForm = ref(null)

const emit = defineEmits(['close-pop-up'])

const handleClickOutside = (event) => {
  if (customForm.value && !customForm.value.contains(event.target)) {
    emit('close-pop-up')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function onSubmit() {
  const myHeaders = new Headers()
  myHeaders.append('X-Api-Key', import.meta.env.VITE_API_KEY)

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch(`${import.meta.env.VITE_API_URL}/${route.params.id}`, requestOptions)
    .then(() => {
      router.push({ name: 'home' })
    })
    .catch((error) => console.log('error', error))
}
</script>

<template>
  <div class="delete-popup-container">
    <div className="delete-popup-body">
      <form class="popup-form" noValidate @submit.prevent="onSubmit" ref="customForm">
        <h2>Delete listing</h2>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
        <button class="delete-submit-button" type="submit">YES, DELETE</button>
        <button class="delete-go-back-button" type="button" @click="emit('close-pop-up')">
          GO BACK
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.delete-popup-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-popup-body {
  position: absolute;
  width: 500px;
  height: 300px;
  text-align: center;
  border-radius: 15px;
  border-color: black;
  background: var(--element-background-2);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 50px;
}

.popup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.popup-form h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}

.popup-form p {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.popup-form button {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: var(--element-background-2);
}

.delete-submit-button {
  margin-top: 40px;
  background-color: var(--element-primary);
}

.delete-go-back-button {
  margin-top: 20px;
  background-color: var(--element-secondary);
}

@media only screen and (max-width: 550px) {
  .delete-popup-body {
    width: 350px;
    height: 250px;
    padding: 20px;
  }

  .delete-submit-button {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 375px) {
  .delete-popup-body {
    width: 340px;
    height: 250px;
    padding: 20px;
  }

  .popup-form {
    align-items: center;
  }

  .popup-form h2 {
    font-size: 14px;
  }

  .popup-form p {
    font-size: 12px;
  }

  .popup-form button {
    font-size: 12px;
    width: 185px;
  }

  .delete-submit-button {
    margin-top: 25px;
  }
}
</style>
