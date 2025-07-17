"use client"

import Header from "@/components/Header"
import MemoryGrid from "@/components/MemoryGrid"
import DecorativeHearts from "@/components/DecorativeHearts"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <Header />
      <MemoryGrid />
      <DecorativeHearts />
    </div>
  )
}
