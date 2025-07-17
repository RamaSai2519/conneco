"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface MemoryTypeSelectorProps {
    value: 'text' | 'image'
    onChange: (value: 'text' | 'image') => void
}

export default function MemoryTypeSelector({ value, onChange }: MemoryTypeSelectorProps) {
    return (
        <div className="space-y-3">
            <Label htmlFor="type" className="text-rose-700 font-medium">Memory Type</Label>
            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex flex-row space-x-6"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image">Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text</Label>
                </div>
            </RadioGroup>
        </div>
    )
}
