"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DateInputProps {
    value: string
    onChange: (value: string) => void
}

export default function DateInput({ value, onChange }: DateInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="date" className="text-rose-700 font-medium">Date</Label>
            <Input
                id="date"
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border-rose-200 focus:border-rose-400"
            />
        </div>
    )
}
