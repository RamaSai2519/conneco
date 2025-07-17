"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Heart, MessageCircle, Share, User, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Post } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MemoryViewerProps {
    post: Post
    isOpen: boolean
    onClose: () => void
}

export default function MemoryViewer({ post, isOpen, onClose }: MemoryViewerProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="flex-1 bg-black flex items-center justify-center relative min-h-[60vh] md:min-h-auto">
                    {post.image_url ? (
                        <Image
                            src={post.image_url}
                            alt={post.caption || "Memory photo"}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <div className="p-8 text-center">
                            <div className="bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200 max-w-md">
                                <p className="text-rose-700 text-xl leading-relaxed">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side - Properties and Details */}
                <div className="w-full md:w-96 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col max-h-[40vh] md:max-h-none">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-rose-100 text-rose-600">
                                    {post.user_name.charAt(0).toUpperCase()}{post.user_name.charAt(1)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-gray-900">{post.user_name}</p>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(post.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Caption/Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4">
                            {post.caption && (
                                <div className="mb-4">
                                    <p className="text-gray-900 leading-relaxed">
                                        {post.caption}
                                    </p>
                                </div>
                            )}

                            {post.type === 'text' && post.content && (
                                <div className="mb-4">
                                    <p className="text-gray-900 leading-relaxed">
                                        <span className="font-semibold">{post.user_name}</span> {post.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Memory Details */}
                    <div className="border-t border-gray-200">
                        <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                                >
                                    <span className="font-semibold text-gray-900">Memory Details</span>
                                    {isDetailsOpen ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="px-4 pb-4">
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Type:</span>
                                                    <span className="capitalize text-gray-900">{post.type}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Created:</span>
                                                    <span className="text-gray-900">
                                                        {new Date(post.created_at).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Memory ID:</span>
                                                    <span className="text-gray-900">#{post._id}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Author ID:</span>
                                                    <span className="text-gray-900">#{post.user_id}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </div>
        </div>
    )
}
