"use client"

import { Upload as AntdUpload, message } from "antd"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { UploadProps } from "antd"
import Raxios from "@/lib/axiosHelper"
import { Upload } from "lucide-react"
import axios from "axios"

interface ImageUploadSectionProps {
    imageUrl: string
    caption: string
    uploadLoading: boolean
    onImageUrlChange: (url: string) => void
    onCaptionChange: (caption: string) => void
    onUploadLoadingChange: (loading: boolean) => void
}

export default function ImageUploadSection({
    imageUrl,
    caption,
    uploadLoading,
    onImageUrlChange,
    onCaptionChange,
    onUploadLoadingChange
}: ImageUploadSectionProps) {
    const customUploadRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
        try {
            onUploadLoadingChange(true)

            const uploadResponse = await Raxios.post('/upload', {
                filename: (file as File).name,
                filetype: (file as File).type || 'image/heic'
            })

            const presignedUrl = uploadResponse.data.data.url
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': (file as File).type
                }
            })

            const fileUrl = presignedUrl.split('?')[0]
            onImageUrlChange(fileUrl)
            message.success('File uploaded successfully!')
            onSuccess?.(fileUrl)

        } catch (error) {
            console.error('Upload error:', error)
            message.error('Failed to upload file. Please try again.')
            onError?.(error as Error)
        } finally {
            onUploadLoadingChange(false)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Label className="text-rose-700 font-medium">
                    Upload Image <span className="text-red-500">*</span>
                </Label>
                <AntdUpload
                    accept="image/*"
                    customRequest={customUploadRequest}
                    showUploadList={{
                        showPreviewIcon: true,
                        showRemoveIcon: true,
                    }}
                    maxCount={1}
                    onRemove={() => {
                        onImageUrlChange('')
                    }}
                    className="w-full"
                >
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 border-dashed h-32"
                        disabled={uploadLoading}
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8" />
                            <span>
                                {uploadLoading ? 'Uploading...' : 'Click or drag image to upload'}
                            </span>
                        </div>
                    </Button>
                </AntdUpload>
                {imageUrl && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                        ✓ Image uploaded successfully
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="caption" className="text-rose-700 font-medium">Caption</Label>
                <Input
                    id="caption"
                    placeholder="Add a caption or description..."
                    value={caption}
                    onChange={(e) => onCaptionChange(e.target.value)}
                    className="border-rose-200 focus:border-rose-400"
                />
            </div>
        </>
    )
}
