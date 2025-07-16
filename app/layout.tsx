import type React from "react"
import type { Metadata } from "next"
import { Kalam } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
})

export const metadata: Metadata = {
  title: "Our Little Space - Memory Book",
  description: "A cute handwritten-themed website for sharing photos and notes",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <body className={kalam.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
