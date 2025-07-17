"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextContentInputProps {
    value: string
    onChange: (value: string) => void
}

export default function TextContentInput({ value, onChange }: TextContentInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="content" className="text-rose-700 font-medium">
                Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
                id="content"
                placeholder="Share your thoughts, feelings, or describe this memory..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-h-[100px] border-rose-200 focus:border-rose-400"
            />
        </div>
    )
}
