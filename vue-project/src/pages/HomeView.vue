<template>
    <div class="home">
      <h1>Latest Posts</h1>
      <div v-if="loading" class="loading">Loading posts...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <PostCard v-for="post in postsStore.posts" :key="post.id" :post="post" />
      </div>
    </div>
  </template>
  
  <script>
  import PostCard from '@/components/PostCard.vue'
  import { usePostsStore } from '@/stores/posts'
  import { ref, onMounted } from 'vue'
  
  export default {
    components: { PostCard },
    setup() {
      const postsStore = usePostsStore()
      const loading = ref(true)
      const error = ref(null)
  
      onMounted(async () => {
        try {
          await postsStore.fetchPosts()
        } catch (err) {
          error.value = 'Failed to load posts. Please try again later.'
          console.error(err)
        } finally {
          loading.value = false
        }
      })
  
      return { 
        loading, 
        error,
        postsStore
      }
    }
  }
  </script>