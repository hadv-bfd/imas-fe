import { apiClient } from './client'
import type { PostItem, PostPayload } from '../../common/types/post'

export async function getPosts() {
  const { data } = await apiClient.get<PostItem[]>('/posts', {
    params: {
      _limit: 10,
    },
  })
  return data
}

export async function createPost(payload: PostPayload) {
  const { data } = await apiClient.post<PostItem>('/posts', payload)
  return data
}

export async function updatePost(id: number, payload: PostPayload) {
  const { data } = await apiClient.put<PostItem>(`/posts/${id}`, payload)
  return data
}

export async function deletePost(id: number) {
  await apiClient.delete(`/posts/${id}`)
}
