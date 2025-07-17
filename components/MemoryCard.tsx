import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Post } from "@/types"

interface MemoryCardProps {
    post: Post
    index: number
}

export default function MemoryCard({ post, index }: MemoryCardProps) {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', '']
    const rotation = rotations[index % rotations.length]

    return (
        <Card
            className={`border-2 border-rose-200 shadow-lg bg-white/90 backdrop-blur-sm transform ${rotation} hover:scale-105 transition-all duration-300 hover:shadow-xl`}
        >
            <CardContent className="p-4">
                {post.image_url ? (
                    <div className="space-y-3">
                        <Image
                            src={post.image_url}
                            alt={post.caption || "Memory photo"}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg border-2 border-rose-100"
                        />
                        <div className="text-center">
                            <p className="text-rose-700 font-semibold">
                                {post.caption}
                            </p>
                            <p className="text-rose-500 text-sm">
                                {new Date(post.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 min-h-[120px] flex items-center">
                            <p className="text-rose-700 text-lg leading-relaxed">
                                {post.content}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-rose-600 font-semibold">
                                - {post.user_name}
                            </p>
                            <p className="text-rose-500 text-sm">
                                {new Date(post.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
