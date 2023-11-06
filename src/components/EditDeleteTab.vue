<script setup>
import editIcon from '../assets/icons/ic_edit@3x.png'
import deleteIcon from '../assets/icons/ic_delete@3x.png'
import editWhiteIcon from '../assets/icons/ic_edit_white@3x.png'
import deleteWhiteIcon from '../assets/icons/ic_delete_white@3x.png'

import DeleteListing from './DeleteListing.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMobileStore } from '../stores/MobileStore'

const props = defineProps({
  houseId: {
    type: Number
  }
})

const route = useRoute()
const router = useRouter()

const mobileStore = useMobileStore()

const isDeleteFormOpen = ref(false)

const onEditClick = () => {
  router.push({
    name: 'houseEdit',
    params: { id: props.houseId ? props.houseId : route.params.id }
  })
}

const openDeletePopUp = () => {
  isDeleteFormOpen.value = true
}

const closeDeletePopUp = () => {
  isDeleteFormOpen.value = false
}
</script>

<template>
  <DeleteListing
    v-if="isDeleteFormOpen"
    @close-pop-up="closeDeletePopUp"
    :houseId="props.houseId"
  />
  <div class="edit-delete-tab">
    <span class="edit-delete-span" @click="onEditClick"
      ><img
        :src="props.houseId ? editIcon : mobileStore.mobileView ? editWhiteIcon : editIcon"
        alt="Edit Icon" /></span
    ><span class="edit-delete-span"
      ><img
        :src="props.houseId ? deleteIcon : mobileStore.mobileView ? deleteWhiteIcon : deleteIcon"
        alt="Delete Icon"
        @click="openDeletePopUp"
    /></span>
  </div>
</template>

<style>
.edit-delete-tab {
  position: absolute;
  margin: 20px 20px 0 0;
  right: 0;
  z-index: 999;
}

.edit-delete-span {
  margin-left: 20px;
  cursor: pointer;
}

.edit-delete-span img {
  height: 20px;
}
</style>
