export interface Post {
    id: number
    user_id: number
    user_name: string
    type: 'text' | 'image'
    content: string
    image_url?: string
    caption?: string
    date: string
    created_at: string
}
