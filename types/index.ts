export interface Post {
    _id: string
    user_id: string
    user_name: string
    type: 'text' | 'image'
    content: string
    image_url?: string
    caption?: string
    date: string
    created_at: string
}
