import { Button } from "@/components/ui/button"
import { Heart, DoorOpen } from "lucide-react"
import { logout_user } from "@/lib/axiosHelper"

export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b-2 border-rose-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-rose-500 fill-current" />
                    <h1 className="text-2xl font-bold text-rose-800">
                        Connecō
                    </h1>
                    <p className="text-rose-500 text-sm">
                        By Rama Sathya Sai
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={logout_user}
                    >
                        <DoorOpen className="w-4 h-4 mr-1" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )
}
