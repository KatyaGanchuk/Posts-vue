<template>
    <div class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <router-link :to="`/post/${post.id}`" class="read-more">Read more</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .post-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .post-card h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  .post-card p {
    color: #666;
    margin-bottom: 12px;
  }
  .read-more {
    color: #42b983;
    text-decoration: none;
    font-weight: 500;
  }
  .read-more:hover {
    text-decoration: underline;
  }
  </style>