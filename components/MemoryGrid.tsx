import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Post } from "@/types"
import MemoryCard from "./MemoryCard"
import AddMemoryForm from "./AddMemoryForm"

interface MemoryGridProps {
    memories: Post[]
    loading: boolean
    onRefresh?: () => void
}

export default function MemoryGrid({ memories, loading, onRefresh }: MemoryGridProps) {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-rose-800 mb-2">
                    Our Beautiful Journey Together
                </h2>
                <p className="text-rose-600 text-lg">
                    Every moment with you is a treasure ♡
                </p>
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
