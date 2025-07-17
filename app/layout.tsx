import type React from "react"
import type { Metadata } from "next"
import { Kalam } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
})

export const metadata: Metadata = {
  title: "Conneco - Memory Book",
  description: "A cute handwritten-themed website for sharing photos and notes"
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
