"use client"

import { useEffect, useState } from "react"
import Raxios from "@/lib/axiosHelper"
import { Post } from "@/types"
import Header from "@/components/Header"
import MemoryGrid from "@/components/MemoryGrid"
import DecorativeHearts from "@/components/DecorativeHearts"

export default function HomePage() {
  const [memories, setMemories] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const fetchPosts = async (sort?: 'newest' | 'oldest') => {
    setLoading(true)
    try {
      const sortField = 'date'
      const order = (sort || sortOrder) === 'newest' ? 'desc' : 'asc'

      const response = await Raxios.get('/posts', {
        params: {
          sort: sortField,
          order: order
        }
      })

      if (response.status === 200 && response.data.success) {
        setMemories(response.data.data.posts || [])
      } else {
        console.error('Failed to fetch posts:', response.data.error || response.statusText)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (newSortOrder: 'newest' | 'oldest') => {
    setSortOrder(newSortOrder)
    fetchPosts(newSortOrder)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <Header />
      <MemoryGrid
        memories={memories}
        loading={loading}
        onRefresh={() => fetchPosts()}
        onSortChange={handleSortChange}
      />
      <DecorativeHearts />
    </div>
  )
}
