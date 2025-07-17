"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface AddMemoryTriggerProps {
    onClick: () => void
}

export default function AddMemoryTrigger({ onClick }: AddMemoryTriggerProps) {
    return (
        <Card 
            className="border-2 border-dashed border-rose-300 shadow-lg bg-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={onClick}
        >
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
    )
}
