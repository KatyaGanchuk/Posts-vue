<template>
  <div class="post-view">
    <router-link to="/" class="back-link">← Back to posts</router-link>
    
    <div v-if="loadingPost" class="loading">Loading post...</div>
    <div v-else-if="postError" class="error">{{ postError }}</div>
    <div v-else-if="post">
      <article class="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </article>
      
      <section class="comments-section">
        <h2>Comments</h2>
        <div v-if="loadingComments" class="loading">Loading comments...</div>
        <div v-else-if="commentsError" class="error">{{ commentsError }}</div>
        <div v-else>
          <div v-if="comments.length === 0" class="no-comments">No comments yet</div>
          <div v-else>
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <p class="comment-body">{{ comment.body }}</p>
              <small class="comment-user">By user {{ comment.user.id }}</small>
            </div>
          </div>
        </div>
      </section>
      
      <CommentForm 
        :post-id="post.id" 
        @comment-added="refreshComments"
      />
    </div>
    <div v-else class="not-found">
      <p>Post not found</p>
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm.vue'
import { usePostsStore } from '@/stores/posts'
import { useCommentsStore } from '@/stores/comments'
import { ref, onMounted, computed } from 'vue'

export default {
  components: { CommentForm },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const postsStore = usePostsStore()
    const commentsStore = useCommentsStore()
    const loadingPost = ref(true)
    const loadingComments = ref(true)
    const postError = ref(null)
    const commentsError = ref(null)

    const loadData = async () => {
      try {
        await Promise.all([
          postsStore.fetchPostDetails(props.id),
          commentsStore.fetchComments(props.id)
        ])
      } catch (err) {
        postError.value = 'Failed to load post details.'
        commentsError.value = 'Failed to load comments.'
        console.error(err)
      } finally {
        loadingPost.value = false
        loadingComments.value = false
      }
    }

    const refreshComments = async () => {
      loadingComments.value = true
      try {
        delete commentsStore.comments[props.id]
        await commentsStore.fetchComments(props.id)
      } catch (err) {
        commentsError.value = 'Failed to refresh comments.'
        console.error(err)
      } finally {
        loadingComments.value = false
      }
    }

    onMounted(loadData)

    const post = computed(() => postsStore.getPostById(Number(props.id)))
    const comments = computed(() => commentsStore.comments[props.id] || [])

    return { 
      loadingPost, 
      loadingComments, 
      postError, 
      commentsError,
      post,
      comments,
      refreshComments
    }
  }
}
</script>