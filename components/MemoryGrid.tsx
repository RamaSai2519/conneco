import { Post } from "@/types"
import { useState } from "react"
import MemoryCard from "./MemoryCard"
import AddMemoryForm from "./AddMemoryForm"
import { Button } from "@/components/ui/button"
import { SortAsc, SortDesc } from "lucide-react"

interface MemoryGridProps {
    memories: Post[]
    loading: boolean
    onRefresh?: () => void
    onSortChange?: (sortOrder: 'newest' | 'oldest') => void
}

export default function MemoryGrid({ memories, loading, onRefresh, onSortChange }: MemoryGridProps) {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

    const handleSort = () => {
        const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest'
        setSortOrder(newSortOrder)
        onSortChange?.(newSortOrder)
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="text-center flex-1">
                    <h2 className="text-3xl font-bold text-rose-800 mb-2">
                        Our Beautiful Journey Together
                    </h2>
                    <p className="text-rose-600 text-lg">
                        Every moment with you is a treasure ♡
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleSort}
                    className="ml-4 text-rose-600 border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                >
                    {sortOrder === 'newest' ? <div className="flex items-center gap-2">
                        Newest First
                        <SortDesc />
                    </div> : <div className="flex items-center gap-2">
                        Oldest First
                        <SortAsc />
                    </div>
                    }
                </Button>
            </div>

            {/* Memory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <AddMemoryForm onMemoryAdded={onRefresh || (() => { })} />
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-rose-600 text-lg">Loading memories...</p>
                    </div>
                ) : (
                    <>
                        {memories.map((post, index) => (
                            <MemoryCard key={post.id} post={post} index={index} />
                        ))}
                    </>
                )}
            </div>
        </main>
    )
}
