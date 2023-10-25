<template>
  <div class="tabs-view">
    <div class="tabs-view__tabs">
      <div
        :class="['tabs-view__tab', { active: currentPost }]"
        @click="selectPostsTab"
      >
        Посты
      </div>
      <div
        :class="['tabs-view__tab', { active: currentUser }]"
        @click="selectUsersTab"
      >
        Пользователи
      </div>
    </div>
    <div class="tabs-view__content">
      <div
        class="tabs-view__current-user"
        v-if="activeUser && currentPost"
      >
        <h2>
          <strong>
            Посты пользователя:
          </strong>
          {{ filtredForName }}
        </h2>
        <w-button
          text="Закрыть"
          close
          @click="clearFilter"
        />
      </div>
      <div
        v-for="post in posts"
        :key="post.id"
        :class="['posts_list', { hidden: !currentPost }]"
      >
        <post-dialog
          :user="currentUser[post.userId]?.name"
          :post="post.body"
          :comments="currentComments[post.id]"
          :postId="post.id"
          @getPosts="$store.dispatch('fetchPosts')"
        />
      </div>
      <p v-if="isLoading || loadMorePostsDelay">{{ loadingMessage }}...</p>
      <div
        v-for="user in users"
        :key="user.id"
        :class="[{ hidden: !currentUser }]"
      >
        <user-dialog
          :userId="user.id"
          :username="user.name"
          :current-post="currentPost"
          :current-user="currentUser"
          @showUserPost="showUserPost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostDialog from "@/components/parts/PostDialog.vue";
import WButton from "@/components/ui/WButton.vue";
import _ from "lodash";
import UserDialog from "@/components/parts/UserDialog.vue";
export default {
  name: "TabsView",
  components: {
    UserDialog,
    WButton,
    PostDialog,
  },
  data() {
    return {
      currentPost: true,
      currentUser: false,
      activeUser: false,
      filtredForName: '',
      loadMorePostsDelay: false,
      loadingMessages: [
        "Грузим посты",
        "Соединяемся с спутником",
        "Звоним Илону Маску",
      ],
    };
  },

  methods: {
    selectPostsTab() {
      this.currentPost = true;
      this.currentUser = false;
    },

    selectUsersTab() {
      this.currentPost = false;
      this.currentUser = true;
    },

    showUserPost(userId, username) {
      this.selectPostsTab();
      this.activeUser = true;
      this.filtredForName = username;
      this.posts = [];
      this.$store.dispatch('fetchComments', userId)
    },

    clearFilter() {
      this.posts = [];
      this.activeUser = false;
      this.$store.dispatch('fetchPosts')
    },

    ScrollHandle() {
      if (
          window.scrollY + window.innerHeight >= document.body.scrollHeight - 50 &&
          !this.activeUser &&
          !this.isLoading &&
          !this.loadMorePostsDelay
      ) {
        this.loadMorePostsDelay = true
        setTimeout(() => {
          this.$store.state.page++;
          this.$store.dispatch('fetchPosts')
          this.loadMorePostsDelay = false
        }, 3000)
      }
    },
  },
  computed: {
    loadingMessage() {
      if (this.isLoading || this.loadMorePostsDelay) {
        const randomIndex = Math.floor(Math.random() * this.loadingMessages.length);
        return this.loadingMessages[randomIndex]
      }
      return ""
    },
    currentComments() {
      return this.$store.state.commentsGroupBy
    },
    isLoading() {
      return this.$store.state.loading
    },
    posts() {
      return this.$store.state.posts
    },
    comments() {
      return this.$store.state.comments
    },
    users() {
      return this.$store.state.users
    },
    currentUser() {
     return  _.keyBy(this.users, "id")
    }
  },
  mounted() {
    this.$store.dispatch('fetchPosts')
    this.$store.dispatch('fetchComments')
    this.$store.dispatch('fetchUsers')
    window.addEventListener("scroll", this.ScrollHandle);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.ScrollHandle);
  },
};
</script>

<style lang="scss" scoped>
.tabs-view {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  &__tabs {
    display: flex;
    justify-content: center;
    gap: 60px;
    align-items: center;
  }

  &__tab {
    padding: 10px 15px;
    border-radius: 40px;
    cursor: pointer;
  }

  &__content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
.active {
  background-color: grey;
}
.hidden {
  display: none;
}
</style>
