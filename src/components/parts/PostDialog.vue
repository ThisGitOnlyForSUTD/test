<template>
  <div class="post__wrap">
    <h3>
      <strong>пользователь:</strong>
      {{ $props.user }}
    </h3>
    <span class="post">
      <strong>пост:</strong>
      {{ $props.post }}
    </span>
    <div class="post__comments">
      <strong>комментарии:</strong>
      <ul v-for="comment in $props.comments" :key="comment.id">
        <li>
          {{ comment.body }}
        </li>
      </ul>
    </div>
    <div class="post__add">
      <w-button @click="addComment" text="Добавить" :disabled="isButtonDisabled" />
      <input class="post__input" placeholder="Напишите комментарий" v-model="inputComment" />
    </div>
  </div>
</template>

<script>
import WButton from '@/components/ui/WButton.vue'

export default {
  components: { WButton },
  props: {
    user: String,
    post: String,
    comments: Array,
    idUser: Number,
    postId: Number,
  },
  data() {
    return {
      inputComment: "",
    };
  },
  computed: {
    isButtonDisabled() {
      return !this.inputComment.trim();
    },
  },
  methods: {
    async addComment() {
      if (!this.isButtonDisabled) {
        const newCommentData = {
          postId: this.$props.postId,
          body: this.inputComment,
          email: 'voloshenko.inc@gmail.com'
        }
        try {
          await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.$props.postId}`, {
            method: "POST",
            body: JSON.stringify(newCommentData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          alert('комментарий добавлен')
          this.$emit('getPosts')
        } catch (error) {
          console.log('Ошибка отправки данных')
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  &__wrap {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    padding: 10px;
  }

  &__comments {
    border-top: 1px solid #000;
    padding-top: 10px;
  }

  &__add {
    justify-content: center;
    margin-top: 40px;
    display: flex;
    gap: 50px;
  }

  &__input {
    width: 100%;
    max-width: 400px;
    border-radius: 15px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid;
  }
}
.disabled {
  cursor: not-allowed !important;
}
</style>
