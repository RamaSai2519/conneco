"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Upload, X } from "lucide-react"
import Raxios from "@/lib/axiosHelper"
import { toast } from "@/hooks/use-toast"

interface AddMemoryFormProps {
    onMemoryAdded: () => void
}

interface NewMemoryData {
    type: 'text' | 'image'
    content?: string
    caption?: string
    image_url?: string
    date?: string
}

export default function AddMemoryForm({ onMemoryAdded }: AddMemoryFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<NewMemoryData>({
        type: 'text',
        content: '',
        caption: '',
        image_url: '',
        date: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Validate required fields based on type
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
                    description: "Please provide an image URL for image memory",
                    variant: "destructive"
                })
                return
            }

            // Prepare data for submission
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

            // Reset form and close dialog
            setFormData({
                type: 'text',
                content: '',
                caption: '',
                image_url: '',
                date: ''
            })
            setIsOpen(false)
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

    const handleInputChange = (field: keyof NewMemoryData, value: string) => {
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: value
            }

            // Clear inappropriate fields when switching types
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Card className="border-2 border-dashed border-rose-300 shadow-lg bg-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer">
                    <CardContent className="p-8 flex flex-col items-center justify-center h-full min-h-[200px] space-y-4">
                        <div className="bg-rose-100 p-4 rounded-full">
                            <Plus className="w-8 h-8 text-rose-500" />
                        </div>
                        <p className="text-rose-600 text-lg font-semibold text-center">
                            Add a new memory
                        </p>
                        <p className="text-rose-500 text-sm text-center">
                            Share a photo or write a sweet note
                        </p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-rose-800">Add a New Memory</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Memory Type */}
                    <div className="space-y-3">
                        <Label htmlFor="type" className="text-rose-700 font-medium">Memory Type</Label>
                        <RadioGroup
                            value={formData.type}
                            onValueChange={(value) => handleInputChange('type', value as 'text' | 'image')}
                            className="flex flex-row space-x-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="text" id="text" />
                                <Label htmlFor="text">Text</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="image" id="image" />
                                <Label htmlFor="image">Image</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Content - Only for text type */}
                    {formData.type === 'text' && (
                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-rose-700 font-medium">
                                Content <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="content"
                                placeholder="Share your thoughts, feelings, or describe this memory..."
                                value={formData.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                className="min-h-[100px] border-rose-200 focus:border-rose-400"
                            />
                        </div>
                    )}

                    {/* Image URL and Caption - Only for image type */}
                    {formData.type === 'image' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="image_url" className="text-rose-700 font-medium">
                                    Image URL <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="image_url"
                                    // type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                                    className="border-rose-200 focus:border-rose-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="caption" className="text-rose-700 font-medium">Caption</Label>
                                <Input
                                    id="caption"
                                    placeholder="Add a caption or description..."
                                    value={formData.caption}
                                    onChange={(e) => handleInputChange('caption', e.target.value)}
                                    className="border-rose-200 focus:border-rose-400"
                                />
                            </div>
                        </>
                    )}

                    {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-rose-700 font-medium">Date</Label>
                        <Input
                            id="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="border-rose-200 focus:border-rose-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                            className="border-rose-300 text-rose-700 hover:bg-rose-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-rose-500 hover:bg-rose-600 text-white"
                        >
                            {isLoading ? 'Adding...' : 'Add Memory'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
