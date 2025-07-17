"use client"

import { useState } from "react"
import AddMemoryTrigger from "./memory-form/AddMemoryTrigger"
import MemoryFormDialog from "./memory-form/MemoryFormDialog"
import type { AddMemoryFormProps } from "./memory-form/types"

export default function AddMemoryForm({ onMemoryAdded }: AddMemoryFormProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
        <>
            <AddMemoryTrigger onClick={handleOpen} />
            <MemoryFormDialog 
                isOpen={isOpen}
                onClose={handleClose}
                onMemoryAdded={onMemoryAdded}
            />
        </>
    )
}
