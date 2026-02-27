import { defineStore } from 'pinia'
import posts from '@/data/posts'

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
  }),
  actions: {
    fetchPosts() {
      this.posts = posts
    },
    addNewPost(post) {
      const newPost = {
        id: String(this.posts.length + 1),
        title: post.title,
        content: post.content,
      }
      this.posts.push(newPost)
    },
  },
})
