import { Heart } from "lucide-react";

export default function DecorativeHearts() {
    const getRandomRotation = () => Math.floor(Math.random() * 91) - 45;

    return (
        <>
            <div className={`fixed top-20 left-10 opacity-10 animate-pulse delay-1000`} style={{ transform: `rotate(${getRandomRotation()}deg)` }}>
                <Heart className="fill-current text-rose-500" />
            </div>
            <div className={`fixed bottom-20 right-10 opacity-15 animate-pulse delay-500`} style={{ transform: `rotate(${getRandomRotation()}deg)` }}>
                <Heart className="fill-current text-rose-500" />
            </div>
            <div className={`fixed top-1/3 right-20 opacity-10 animate-pulse delay-500`} style={{ transform: `rotate(${getRandomRotation()}deg)` }}>
                <Heart className="fill-current text-rose-500" />
            </div>
            <div className={`fixed bottom-10 left-10 opacity-15 animate-pulse delay-1000`} style={{ transform: `rotate(${getRandomRotation()}deg)` }}>
                <Heart className="fill-current text-rose-500" />
            </div>
        </>
    )
}
