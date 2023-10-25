<template>
  <button class="button" :class="[{'danger': props.error}]">
    {{props.text}}
    <span v-if="props.close">
      x
    </span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  close: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  }
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: center;
  background-color: grey;
  padding: 10px 15px;
  border: none;
  border-radius: 40px;
  color: #fff;
  cursor: pointer;
}
</style>