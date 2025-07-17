// Types for the memory form components
export interface NewMemoryData {
    type: 'text' | 'image'
    content?: string
    caption?: string
    image_url?: string
    date?: string
}

export interface AddMemoryFormProps {
    onMemoryAdded: () => void
}
