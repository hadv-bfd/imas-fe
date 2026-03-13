export type PostItem = {
  id: number
  userId: number
  title: string
  body: string
}

export type PostPayload = {
  title: string
  body: string
  userId: number
}
