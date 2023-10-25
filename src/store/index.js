import { createStore } from 'vuex'
import _ from 'lodash'

export default createStore({
  state: {
    posts: [],
    comments: [],
    users: [],
    page: 1,
    limit: 20,
    loading: false,
    commentsGroupBy: {},
  },
  mutations: {
    SET_POSTS(state, newPosts) {
      state.posts = state.posts.concat(newPosts);
    },
    IS_LOADING(state, value) {
      state.loading = value;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
      state.commentsGroupBy = _.groupBy(comments, 'postId');
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      commit('IS_LOADING', true)

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`);
        const posts = await response.json();
        commit('SET_POSTS', posts);
      } catch (error) {
        console.error('Произошла ошибка:', error);
      } finally {
        commit('IS_LOADING', false);
      }
    },
    async fetchUsers({ commit }) {
      commit('IS_LOADING', true)

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        commit('SET_USERS', users)
      } catch (error) {
        console.error('Произошла ошибка:', error);
      } finally {
        commit('IS_LOADING', false)
      }
    },

    async fetchFilteredPosts({ commit }, userId) {
      commit('SET_DATA_AWAIT', true)

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        commit('SET_POSTS', posts)
      } catch (error) {
        console.error('Произошла ошибка:', error)
      } finally {
        commit('SET_DATA_AWAIT', false)
      }
    },

    async fetchComments({ commit }) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await response.json()
        commit('SET_COMMENTS', comments)
      } catch (error) {
        console.error('Произошла ошибка:', error)
      }
    },
  },
  modules: {
  }
})
