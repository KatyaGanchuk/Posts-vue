<template>
    <form @submit.prevent="submitComment" class="comment-form">
      <h3>Add Comment</h3>
      <textarea 
        v-model="commentText" 
        placeholder="Write your comment here..." 
        required
        rows="4"
      ></textarea>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : 'Submit Comment' }}
      </button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useCommentsStore } from '@/stores/comments'
  
  export default {
    props: {
      postId: {
        type: Number,
        required: true
      }
    },
    setup(props, { emit }) {
      const commentsStore = useCommentsStore()
      const commentText = ref('')
      const isSubmitting = ref(false)
  
      const submitComment = async () => {
        isSubmitting.value = true
        try {
          await commentsStore.addComment(props.postId, commentText.value)
          commentText.value = ''
          emit('comment-added')
        } catch (error) {
          console.error('Error adding comment:', error)
          alert('Failed to add comment. Please try again.')
        } finally {
          isSubmitting.value = false
        }
      }
  
      return {
        commentText,
        isSubmitting,
        submitComment
      }
    }
  }
  </script>