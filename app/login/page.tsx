'use client'

import axios from 'axios'
import { useState } from 'react'
import { Heart, Lock } from "lucide-react"
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/lib/axiosHelper'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import DecorativeHearts from '@/components/DecorativeHearts'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!password) {
      setError('Please enter the password!')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, { password })
      console.log("🚀 ~ handleSubmit ~ response:", response)
      if (response.status === 200) {
        const { user, tokens } = response.data.data
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access_token', tokens.access)
        localStorage.setItem('refresh_token', tokens.refresh)

        router.push('/')
        setIsLoading(false)
      } else {
        setError('Incorrect password. Please try again.')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Login failed', error);
      setError('Incorrect password. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-rose-200 shadow-lg bg-white/80 backdrop-blur-sm transform rotate-1">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Heart className="w-8 h-8 text-rose-500 fill-current" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-rose-800 mb-2 -rotate-1">
              Hey Chinnu!
            </h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-rose-400 z-10" />
                  <Input
                    type="password"
                    placeholder="Enter your Secret password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 border-rose-200 focus:border-rose-400 rounded-lg h-12 text-lg rotate-1"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-rose-400 hover:bg-rose-500 text-white text-lg font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 -rotate-1"
              >
                {isLoading ? 'Logging in...' : 'Come on in! ♡'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-rose-600 text-lg">
                Connecō - A space just for us ♡
              </p>
            </div>
          </CardContent>
        </Card>

        <DecorativeHearts />
      </div>
    </div>
  )
}
