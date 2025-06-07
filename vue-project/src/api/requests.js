import axios from 'axios'

const API_BASE = 'https://dummyjson.com'

export default {
  getPosts() {
    return axios.get(`${API_BASE}/posts`)
  },
  getPost(id) {
    return axios.get(`${API_BASE}/posts/${id}`)
  },
  getPostComments(postId) {
    return axios.get(`${API_BASE}/comments/post/${postId}`)
  },
  addComment(data) {
    return axios.post(`${API_BASE}/comments/add`, data)
  }
}