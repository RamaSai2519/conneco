"use client"

import { Button } from "@/components/ui/button"

interface FormActionsProps {
    isLoading: boolean
    onCancel: () => void
}

export default function FormActions({ isLoading, onCancel }: FormActionsProps) {
    return (
        <div className="flex justify-end space-x-3 pt-4">
            <Button
                type="button"
                variant="outline"
                onClick={onCancel}
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
    )
}
