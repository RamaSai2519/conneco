"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import Raxios from "@/lib/axiosHelper"
import MemoryTypeSelector from "./MemoryTypeSelector"
import TextContentInput from "./TextContentInput"
import ImageUploadSection from "./ImageUploadSection"
import DateInput from "./DateInput"
import FormActions from "./FormActions"
import { NewMemoryData } from "./types"

interface MemoryFormDialogProps {
    isOpen: boolean
    onClose: () => void
    onMemoryAdded: () => void
}

export default function MemoryFormDialog({ isOpen, onClose, onMemoryAdded }: MemoryFormDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [formData, setFormData] = useState<NewMemoryData>({
        type: 'image',
        content: '',
        caption: '',
        image_url: '',
        date: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (formData.type === 'text' && !formData.content) {
                toast({
                    title: "Error",
                    description: "Please provide content for text memory",
                    variant: "destructive"
                })
                return
            }

            if (formData.type === 'image' && !formData.image_url) {
                toast({
                    title: "Error",
                    description: "Please upload an image for image memory",
                    variant: "destructive"
                })
                return
            }

            const submitData: NewMemoryData = {
                type: formData.type,
                ...(formData.content && { content: formData.content }),
                ...(formData.caption && { caption: formData.caption }),
                ...(formData.image_url && { image_url: formData.image_url }),
                ...(formData.date && { date: formData.date })
            }

            await Raxios.post('/create', submitData)

            toast({
                title: "Success",
                description: "Memory added successfully!",
                variant: "default"
            })

            resetForm()
            onClose()
            onMemoryAdded()
        } catch (error) {
            console.error('Error creating memory:', error)
            toast({
                title: "Error",
                description: "Failed to create memory. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            type: 'text',
            content: '',
            caption: '',
            image_url: '',
            date: ''
        })
    }

    const handleInputChange = (field: keyof NewMemoryData, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value }

            if (field === 'type') {
                if (value === 'text') {
                    newData.image_url = ''
                    newData.caption = ''
                } else if (value === 'image') {
                    newData.content = ''
                }
            }

            return newData
        })
    }

    const handleTypeChange = (type: 'text' | 'image') => {
        handleInputChange('type', type)
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-rose-800">Add a New Memory</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <MemoryTypeSelector
                        value={formData.type}
                        onChange={handleTypeChange}
                    />

                    {formData.type === 'text' && (
                        <TextContentInput
                            value={formData.content || ''}
                            onChange={(value) => handleInputChange('content', value)}
                        />
                    )}

                    {formData.type === 'image' && (
                        <ImageUploadSection
                            imageUrl={formData.image_url || ''}
                            caption={formData.caption || ''}
                            uploadLoading={uploadLoading}
                            onImageUrlChange={(url) => handleInputChange('image_url', url)}
                            onCaptionChange={(caption) => handleInputChange('caption', caption)}
                            onUploadLoadingChange={setUploadLoading}
                        />
                    )}

                    <DateInput
                        value={formData.date || ''}
                        onChange={(value) => handleInputChange('date', value)}
                    />

                    <FormActions
                        isLoading={isLoading}
                        onCancel={handleClose}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}
