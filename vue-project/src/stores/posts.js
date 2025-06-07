import { defineStore } from 'pinia'
import api from '@/api/requests'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    postDetails: {}
  }),
  actions: {
    async fetchPosts() {
      if (this.posts.length) return
      
      try {
        const response = await api.getPosts()
        this.posts = response.data.posts
      } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
      }
    },
    async fetchPostDetails(id) {
      if (this.postDetails[id]) return
      
      try {
        const response = await api.getPost(id)
        this.postDetails[id] = response.data
      } catch (error) {
        console.error('Error fetching post details:', error)
        throw error
      }
    }
  },
  getters: {
    getPostById: (state) => (id) => {
      return state.postDetails[id] || null
    }
  }
})