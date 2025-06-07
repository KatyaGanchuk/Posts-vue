import { defineStore } from 'pinia'
import api from '@/api/requests'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: {}
  }),
  actions: {
    async fetchComments(postId) {
      try {
        const response = await api.getPostComments(postId)
        this.comments[postId] = response.data.comments || []
      } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
      }
    },
    async addComment(postId, commentText) {
      try {

        const response = await api.addComment({
          body: commentText,
          postId: postId,
          userId: 1
        })
        

        if (!this.comments[postId]) {
          this.comments[postId] = []
        }
        
        this.comments[postId].unshift({
          id: Date.now(),
          body: commentText,
          user: { id: 1 },
          ...response.data
        })
        
        return response.data
      } catch (error) {
        console.error('Error adding comment:', error)
        throw error
      }
    }
  }
})