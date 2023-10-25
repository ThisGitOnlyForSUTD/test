<template>
    <div class="user-dialog__wrap">
        <h3>
          <strong>Пользователь:</strong>
          {{ $props.username }}
        </h3>
      <w-button @click="showPosts" text="Посмотреть посты пользователя" />
    </div>
  </template>
  
  <script>
  import WButton from "@/components/ui/WButton.vue";

  export default {
    name: "UserDialog",
    components: { WButton },
    props: {
        username: String,
        userId: Number,
    },
    methods: {
      showPosts(){
        this.$emit('showUserPosts', this.$props.userId, this.$props.username)
      }
    }
  };

  </script>
  
  <style scoped lang="scss">
  .user-dialog__wrap {
    border-radius: 40px;
    border: 1px solid;
    padding: 20px;
  }
  </style>