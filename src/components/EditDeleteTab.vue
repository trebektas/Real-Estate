<script setup>
import editIcon from '../assets/icons/ic_edit@3x.png'
import deleteIcon from '../assets/icons/ic_delete@3x.png'
import editWhiteIcon from '../assets/icons/ic_edit_white@3x.png'
import deleteWhiteIcon from '../assets/icons/ic_delete_white@3x.png'

import DeleteListing from './DeleteListing.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  houseId: {
    type: Number
  },
  isMobileClass: { type: String }
})

const route = useRoute()
const router = useRouter()

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
  <div class="edit-delete-tab" :class="isMobileClass">
    <span class="edit-delete-span" @click="onEditClick"
      ><img
        :src="
          props.houseId ? editIcon : isMobileClass === 'mobile-content' ? editWhiteIcon : editIcon
        "
        alt="Edit Icon" /></span
    ><span class="edit-delete-span"
      ><img
        :src="
          props.houseId
            ? deleteIcon
            : isMobileClass === 'mobile-content'
            ? deleteWhiteIcon
            : deleteIcon
        "
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
