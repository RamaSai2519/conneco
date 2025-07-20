import { Post } from "@/types"
import { useState, useEffect, useCallback, useRef } from "react"
import Raxios from "@/lib/axiosHelper"
import MemoryCard from "./MemoryCard"
import AddMemoryForm from "./AddMemoryForm"
import { Button } from "@/components/ui/button"
import { SortAsc, SortDesc } from "lucide-react"


export default function MemoryGrid({ }) {
    const [memories, setMemories] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMoreData, setHasMoreData] = useState(true)
    const [size, setSize] = useState(5)
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
    const observerTarget = useRef<HTMLDivElement>(null)

    const fetchPosts = async (sort?: 'newest' | 'oldest', pageNum = 1, isNewSort = false) => {
        if (pageNum === 1) {
            setLoading(true)
        } else {
            setLoadingMore(true)
        }

        try {
            const sortField = 'date'
            const order = (sort || sortOrder) === 'newest' ? 'desc' : 'asc'

            const response = await Raxios.get('/posts', {
                params: { sort: sortField, order: order, page: pageNum, size }
            })

            if (response.status === 200 && response.data.success) {
                const newPosts = response.data.data.posts || []
                const totalPosts = response.data.data.total || 0

                if (pageNum === 1 || isNewSort) {
                    setMemories(newPosts)
                } else {
                    setMemories(prev => [...prev, ...newPosts])
                }

                const currentTotal = pageNum === 1 || isNewSort ? newPosts.length : memories.length + newPosts.length
                setHasMoreData(currentTotal < totalPosts && newPosts.length === size)
            } else {
                console.error('Failed to fetch posts:', response.data.error || response.statusText)
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const handleSort = () => {
        const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest'
        setSortOrder(newSortOrder)
        setPage(1)
        setHasMoreData(true)
        fetchPosts(newSortOrder, 1, true)
    }

    const loadMorePosts = useCallback(() => {
        if (!loadingMore && hasMoreData) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchPosts(sortOrder, nextPage)
        }
    }, [loadingMore, hasMoreData, page, sortOrder])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting && hasMoreData && !loading && !loadingMore) {
                    loadMorePosts()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [loadMorePosts, hasMoreData, loading, loadingMore])

    useEffect(() => {
        fetchPosts()
    }, [])

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl mx-auto">
                <AddMemoryForm onMemoryAdded={() => {
                    setPage(1)
                    setHasMoreData(true)
                    fetchPosts(sortOrder, 1, true)
                }} />
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-rose-600 text-lg">Loading memories...</p>
                    </div>
                ) : (
                    <>
                        {memories.map((post, index) => (
                            <MemoryCard key={post._id} post={post} index={index} />
                        ))}
                    </>
                )}
            </div>

            {loadingMore && (
                <div className="text-center py-8">
                    <p className="text-rose-600 text-lg">Loading more memories...</p>
                </div>
            )}

            {!loading && !hasMoreData && memories.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-rose-400 text-sm">You've reached the end of your beautiful journey ♡</p>
                </div>
            )}

            <div ref={observerTarget} className="h-4" />
        </main>
    )
}
